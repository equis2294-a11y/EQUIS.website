# EQUIS website — deployment package

This is a static website with a Vercel serverless API and a Supabase-backed request database.

## Included
- `index.html` — public EQUIS website and bottle concept customizer.
- `admin.html` — private request dashboard at `/admin.html`.
- `api/orders.js` — server-side API for saving requests and managing statuses.
- `schema.sql` — database table and restrictive Row Level Security setup.
- `.env.example` — names of required server-side environment variables.
- `vercel.json` — Vercel function runtime configuration.

## Before order saving works
1. An eligible adult account holder should create/manage the Vercel and Supabase accounts.
2. Create a Supabase project and run all of `schema.sql` in Supabase → SQL Editor.
3. In Supabase project settings, copy the Project URL and the `service_role` secret key.
4. In Vercel → Project → Settings → Environment Variables, add `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_ACCESS_TOKEN`.
5. Make `ADMIN_ACCESS_TOKEN` a long, random secret. Never put it in HTML, GitHub, screenshots, or messages. Redeploy after adding variables.
6. Open `/` and submit a test enquiry. Open `/admin.html`, enter the admin token, and load requests.

## Deploy from GitHub on Android
1. Extract this ZIP on the phone.
2. Create a GitHub repository and upload the **contents** of the extracted `equis-final` folder (not the ZIP itself). Make sure `index.html`, `api/`, `schema.sql`, `admin.html`, and `vercel.json` are at repository root.
3. Import the repository into Vercel. Select Framework Preset `Other`; set Build Command to blank/None and Output Directory to `.` if Vercel asks. Deploy.
4. Configure the environment variables above and redeploy.

## Important limitations / launch checklist
- A submitted order request is not an accepted/confirmed sale. Admin must review and explicitly confirm price, stock, manufacturer, compliant label, delivery and terms with the customer.
- No payment gateway is connected in this package. Keep payments disabled. Payment test-mode integration should be added only after the adult account holder configures an eligible merchant account; never collect card details on this website.
- Business email, phone, legal business identity, privacy notice, terms, refund/cancellation policy and verified supplier information still need to be supplied before public commercial launch.
- The website copy treats EQUIS as a branding/customisation concept. Do not sell or label packaged water until the licensed manufacturer, required FSSAI/Legal Metrology declarations and all applicable approvals are verified.
- This starter has basic input validation but is not a substitute for a production security review. Before public launch, add rate limiting, bot protection, backups, monitoring, privacy/data-retention controls and an audited admin authentication system. Admin token access is intended only as a temporary setup tool.

## Environment variables
See `.env.example`. Secrets belong only in Vercel environment variables, never in source files.
