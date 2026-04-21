# Aerotron Industries — Website PRD

## Original Problem Statement
Build a corporate marketing website for **Aerotron Industries**, a Bengaluru-based toolroom with 20+ years of experience in die-casting moulds, plastic injection moulds, jigs & fixtures, PCBA/EMS tooling, NPD, and production of AIS-140 enclosures, IP69 enclosures (plastic + aluminium), aerospace die-cast parts, wave-solder/reflow fixtures and power-grid die-cast parts. Site must showcase capabilities, products, industries served, and capture inquiries via email.

## User Personas
- **Procurement / Sourcing Leads** (OEMs, Tier-1s) evaluating a tooling partner
- **Design / NPD Engineers** looking for DFM + mould-build collaboration
- **EMS / PCBA Managers** sourcing wave-solder pallets & reflow carriers
- **Defense / Aerospace Buyers** needing traceable, certified parts

## Core Requirements (static)
- Single-page marketing site, responsive, premium industrial aesthetic
- Sections: Nav · Hero · Stats Marquee · Capabilities · Products · Industries · About · Contact · Footer
- Contact form submissions must be emailed to the business
- Must reflect brand (horse logo, blue #1F8ACB) + ISO 9001:2015, 20+ yrs, 400+ moulds, 150+ clients
- Industries: Automotive, Aerospace, Power Grid, Telecom, EV, Defense

## Architecture
- **Frontend**: React 19 + CRA + Tailwind + shadcn primitives + framer-motion + sonner
  - Fonts: Cabinet Grotesk (display), Manrope (body), JetBrains Mono (technical)
  - Component structure: `/src/components/site/*` + `/src/lib/data.js` for all content
- **Backend**: FastAPI + Motor (MongoDB) + Resend SDK
  - `POST /api/contact` — public, validates payload, sends email via Resend, persists to Mongo
  - `GET /api/contact` — admin-only (requires `X-Admin-Token` header)
  - `GET /api/health`, `GET /api/`
- **Email**: Resend (currently in test mode → emails go to `lokeshver855@gmail.com`). Once a domain is verified at resend.com/domains, update `SENDER_EMAIL` and `CONTACT_RECIPIENT_EMAIL` in `/app/backend/.env` to send to `aerotronindsutries1@gmail.com`.

## What's Been Implemented (Dec 2025)
- [x] Full single-page website with 9 sections
- [x] Responsive design (mobile menu, tetris product grid, control-room capability grid)
- [x] Contact form with Resend email integration + MongoDB persistence
- [x] Admin-protected inquiry listing endpoint
- [x] Stats marquee, blueprint grid backgrounds, monospaced technical accents
- [x] Framer-motion scroll reveals and hover interactions
- [x] All data-testid attributes for testability
- [x] Tested end-to-end (100% backend, 100% frontend pass rate)

## Environment Variables
- Backend: `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS`, `RESEND_API_KEY`, `SENDER_EMAIL`, `CONTACT_RECIPIENT_EMAIL`, `CONTACT_FORWARD_TO`, `ADMIN_TOKEN`
- Frontend: `REACT_APP_BACKEND_URL`

## Backlog / Future Enhancements
### P1
- Verify domain in Resend → route emails to `aerotronindsutries1@gmail.com`
- Admin dashboard (simple protected page) to view inquiries
- SEO meta + Open Graph tags + sitemap.xml + favicon based on logo
- Google Analytics / Plausible integration
### P2
- Case studies page (project-by-project deep dives with drawings/DFM)
- Downloadable company profile PDF / capability deck
- Client logo wall (automotive, aerospace partners)
- Multi-language (Hindi / Kannada) support
- Google Maps embed for office + factory locations
- WhatsApp click-to-chat button

## Test Credentials / Secrets
- `ADMIN_TOKEN`: stored in `/app/backend/.env` — required to access `GET /api/contact`
- Resend API key is test-mode; emails only reach the Resend account owner until a domain is verified
