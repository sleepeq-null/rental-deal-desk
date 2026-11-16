# Rental Deal Desk

A single-page underwriting tool for single-family and multifamily rental properties. Enter a deal and get an operator's read on it instantly.

**Live tool:** https://sleepeq-null.github.io/rental-deal-desk/

## What it does

- **Verdict**: Strong deal / Workable / Pass on it, with the reasons
- **Max offer price**: the highest price that still hits your target cash-on-cash return (or the 70% rule when a BRRRR refi is modeled)
- **Key metrics**: monthly cash flow (and per door), cash-on-cash, cap rate, DSCR, IRR, equity multiple, total profit, net sale proceeds
- **Operator checklist**: $200/door/mo, 10% CoC, 7% cap, 1.25× DSCR, 1% rule, break-even occupancy under 80%, 15% IRR
- **Year-one pro forma**: line-by-line operating statement
- **BRRRR refinance**: cash-out, cash left in the deal, post-refi cash flow and CoC
- **Wealth chart**: equity plus cash collected by year vs. cash invested
- **Sensitivity grid**: monthly cash flow across ±10% price and rent
- **Hold-period projection**: year-by-year rent, NOI, debt service, cash flow, value, loan balance, equity
- **Saved deals**: compare properties side by side (stored in your browser)

## Assumptions

- Rented from month one (rehab downtime isn't modeled)
- Percentage expenses (repairs, CapEx, management) are taken on rent collected after vacancy
- Value starts at the after-repair value and grows monthly at the appreciation rate
- Sold at the end of the final year, net of selling costs
- No income tax, depreciation, or capital gains tax

## Running locally

It's one static file with no build step. Open `index.html` in a browser.

---

This is an underwriting aid, not financial advice.
