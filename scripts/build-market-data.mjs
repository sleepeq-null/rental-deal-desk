// Builds data/zip-market.json from Zillow's public research data:
//   ZORI (Zillow Observed Rent Index, all homes, smoothed) and
//   ZHVI (Zillow Home Value Index, mid-tier single-family + condo, smoothed, seasonally adjusted).
// Usage:
//   node scripts/build-market-data.mjs                 # downloads the latest CSVs
//   node scripts/build-market-data.mjs zori.csv zhvi.csv
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const ZORI_URL = 'https://files.zillowstatic.com/research/public_csvs/zori/Zip_zori_uc_sfrcondomfr_sm_month.csv';
const ZHVI_URL = 'https://files.zillowstatic.com/research/public_csvs/zhvi/Zip_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv';

async function load(pathOrUrl) {
  if (/^https?:/.test(pathOrUrl)) {
    const res = await fetch(pathOrUrl);
    if (!res.ok) throw new Error(`Download failed (${res.status}): ${pathOrUrl}`);
    return res.text();
  }
  return readFile(pathOrUrl, 'utf8');
}

// Minimal RFC 4180 line parser (fields may be quoted and contain commas).
function parseLine(line) {
  const out = [];
  let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) {
      if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; }
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ',') { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out;
}

// Returns Map(zip -> {latest, yearAgo, date, city, state, metro, county})
function parse(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  const head = parseLine(lines[0]);
  const col = n => head.indexOf(n);
  const firstDate = head.findIndex(h => /^\d{4}-\d{2}-\d{2}$/.test(h));
  const rows = new Map();
  for (let i = 1; i < lines.length; i++) {
    const r = parseLine(lines[i]);
    let j = r.length - 1;
    while (j >= firstDate && (r[j] === '' || r[j] == null)) j--;
    if (j < firstDate) continue;
    const latest = +r[j], yearAgo = j - 12 >= firstDate && r[j - 12] !== '' ? +r[j - 12] : null;
    rows.set(r[col('RegionName')].padStart(5, '0'), {
      latest, yearAgo, date: head[j],
      city: r[col('City')], state: r[col('State')], metro: r[col('Metro')], county: r[col('CountyName')],
    });
  }
  return rows;
}

const [zoriSrc = ZORI_URL, zhviSrc = ZHVI_URL] = process.argv.slice(2);
const [zori, zhvi] = await Promise.all([load(zoriSrc), load(zhviSrc)]).then(([a, b]) => [parse(a), parse(b)]);

const zips = {};
const round = (n, d = 0) => n == null || !isFinite(n) ? null : Math.round(n * 10 ** d) / 10 ** d;
for (const zip of new Set([...zori.keys(), ...zhvi.keys()])) {
  const r = zori.get(zip), v = zhvi.get(zip), meta = r || v;
  // [rent, rent 12 months earlier, value, value 12 months earlier, city, state, metro, county]
  zips[zip] = [round(r?.latest), round(r?.yearAgo), round(v?.latest), round(v?.yearAgo),
    meta.city || '', meta.state || '', meta.metro || '', meta.county || ''];
}
const pickDate = m => [...m.values()].reduce((a, x) => (x.date > a ? x.date : a), '');
const out = {
  rentAsOf: pickDate(zori), valueAsOf: pickDate(zhvi), builtAt: new Date().toISOString().slice(0, 10),
  source: 'Zillow Research: ZORI (all homes, smoothed) and ZHVI (mid-tier single-family and condo, smoothed, seasonally adjusted)',
  fields: ['rent', 'rentYearAgo', 'value', 'valueYearAgo', 'city', 'state', 'metro', 'county'],
  zips,
};
await mkdir(new URL('../data/', import.meta.url), { recursive: true });
await writeFile(new URL('../data/zip-market.json', import.meta.url), JSON.stringify(out));
console.log(`ZIPs: ${Object.keys(zips).length} (rent ${zori.size}, value ${zhvi.size}); rent as of ${out.rentAsOf}, value as of ${out.valueAsOf}`);
