# Rental Deal Desk

A single-page underwriting tool for single-family and multifamily real estate, with three calculators (**Buy a rental**, **Airbnb / short-term** and **Ground-up build**) and a **Live comps & crime** lookup. Enter a deal and get an operator's read on it instantly.

**Live tool:** https://sleepeq-null.github.io/rental-deal-desk/

## Buy a rental

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

## Airbnb / short-term

Open it at https://sleepeq-null.github.io/rental-deal-desk/#str

- Revenue from nightly rate, occupancy, average stay and per-stay cleaning fees
- Costs that only short-term rentals have: platform fees, cleaners per turnover, supplies, co-host fee, utilities and internet, pricing software, STR permit, furniture replacement
- Break-even occupancy, RevPAR, gross revenue ÷ price, and how it compares with renting long-term
- Short-term rental checklist with a higher bar than a long-term rental
- Sensitivity grid across nightly rate and occupancy, plus a hold-period projection with IRR

## Live comps & crime

Open it at https://sleepeq-null.github.io/rental-deal-desk/#comps

Enter an address and pull:

- **Rent comps and rent estimate** from [RentCast](https://www.rentcast.io/api) (free key, 50 lookups a month)
- **Sale comps and value estimate** from RentCast
- **Airbnb comps**: nightly rate, occupancy and revenue for similar nearby listings from [AirROI](https://www.airroi.com/api) (paid per lookup)
- **Area crime grade A–F**: violent and property crime per 100,000 residents from the [FBI Crime Data API](https://api.data.gov/signup/), compared with the state and U.S. rates, with the year-over-year trend. Uses a shared demo key (10 lookups an hour) unless you add your own free key.
- **Map** of the property, comps, and a 1-mile ring colored by the crime grade

One click sends a comp result into the other calculators (rent, purchase price, after-repair value, finished value, nightly rate and occupancy). API keys are saved in your browser only and sent only to their own service. Crime data is city-wide or county-wide, not block by block.

## Ground-up build

Open it directly at https://sleepeq-null.github.io/rental-deal-desk/#build

- **Verdict**: Build it / Tighten it up / Don't break ground, based on the construction checks plus whichever exit returns more
- **Two exit strategies side by side**: build to sell, or rent it out, refinance the construction loan, and hold
- **Max lot price** for your target profit margin, plus break-even sale price and all-in cost per square foot
- **Project budget**: land, vertical construction, site work, contingency, plans, permits and impact fees, other soft costs, loan points, construction interest, carrying costs
- **Construction loan**: loan-to-cost, equity in first, monthly draws, interest added to the loan balance
- **Refinance sized like a real lender**: the smaller of the loan-to-value amount and what the rent supports at the lender's minimum DSCR
- **Developer metrics**: profit margin on cost, cost-to-value, yield on cost, development spread over market cap rate, IRR and equity multiple for each exit
- **Sensitivity grid**: profit if sold across ±10% build cost and finished value
- **Draw schedule**: month by month spend, equity, loan draws, interest and loan balance

## Assumptions

**Rentals**

- Rented from month one (rehab downtime isn't modeled)
- Percentage expenses (repairs, CapEx, management) are taken on rent collected after vacancy
- Value starts at the after-repair value and grows monthly at the appreciation rate
- Sold at the end of the final year, net of selling costs

**Ground-up builds**

- Lot, plans and permits are paid at closing; hard costs, contingency and other soft costs are spent evenly over the build
- Equity goes in first, then the construction loan funds draws; interest is added to the loan balance until sale or refinance
- No rental income during the lease-up months

No income tax, depreciation, or capital gains tax is modeled in either calculator.

## Running locally

It's one static file with no build step. Open `index.html` in a browser.

---

This is an underwriting aid, not financial advice.
