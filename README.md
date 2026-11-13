# EQUIS website + backend starter

A deployable Next.js app for EQUIS, Srinagar. It includes a luxury black/silver marketing site, customer enquiry/confirmed-order request form, server-side Supabase order storage, and a Razorpay **test-only** checkout scaffold.

## Important launch boundary
This repository is deployment-ready as a starter, but it is not yet a publicly launched business website. A domain, adult-authorised hosting/database/payment accounts, official business email/phone, food-business approvals, manufacturer agreements, pricing and legal pages must be completed before accepting customers or money. Because the owner is a minor, a parent/guardian must own or supervise accounts and complete any provider/business verification. Do not put passwords, OTPs, payment secrets or identity documents in chat.

## Stack
- Next.js App Router (server routes)
- Supabase Postgres; service-role key is server-only; RLS enabled and public table access revoked
- Razorpay Orders API test-mode scaffold; server-side signature verification
- Vercel-compatible Node deployment

## 1. Local setup
1. Install Node.js LTS and Git.
2. Copy `.env.example` to `.env.local`.
3. Create a Supabase project with the adult account holder and run `supabase/schema.sql` in SQL Editor.
4. Add the Supabase project URL and service-role key to `.env.local` (server-only; never commit).
5. Keep `PAYMENTS_MODE=test`. Leave Razorpay values blank until an adult-authorised merchant account has been created in test mode.
6. Run:
   ```bash
   npm install
   npm run dev
   ```
7. Open http://localhost:3000. Submit a test enquiry and check the `equis_orders` table.

## 2. Test payments
A customer cannot pay immediately. An authorised operator must review the request, set a final quote in `quoted_amount_paise`, and change `status` to `confirmed` in a protected admin workflow. The payment API then creates a Razorpay test order. The starter includes signature verification but deliberately does not provide an unauthenticated public way to set prices or confirm orders.

The payment endpoints are backend scaffolding; a customer-facing payment button and protected admin console still need to be added after account ownership and operations are established. Do not accept live funds through this starter. Razorpay test transactions are simulations and do not move money.

## 3. Deploy to Vercel
1. An adult account holder creates the hosting account and imports this repository.
2. Add all `.env.example` values in Vercel Project Settings → Environment Variables. Keep `SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` and mail API keys server-only.
3. Deploy to a temporary `*.vercel.app` URL first.
4. Test order creation, error handling, privacy/legal pages and mobile layout.
5. Only after the business email/domain is approved, connect the chosen domain in Vercel and follow its DNS instructions. Domain availability is not checked/reserved by this project.

## 4. Business email first
Choose a domain only after an adult/guardian confirms the business name and registration/ownership plan. Then choose a business email provider and create addresses such as `hello@your-domain.in` and `orders@your-domain.in`. Publish the provider's MX, SPF and DKIM records exactly as supplied; add DMARC with a cautious policy and review reports. Do not use a personal home address as the public business address. The website currently displays a configurable email placeholder; replace it only with an official mailbox.

## 5. Before launch
- Confirm permitted private-label/relabeller model with J&K Food Safety Department and manufacturer; labels must be compliant and approved.
- Confirm Legal Metrology declarations, product traceability, batch/recall responsibilities and applicable FSSAI testing.
- Add Privacy Policy, Terms, Cancellation/Refund Policy, Shipping/Delivery Policy and contact/business identity pages reviewed by a qualified adult/professional.
- Add a protected admin panel with Supabase Auth + MFA and role-based access before staff manage orders. Do not expose service-role credentials.
- Add durable rate limiting/bot protection (e.g. platform firewall or managed rate limiter); current honeypot and origin check are baseline controls, not a complete abuse-prevention system.
- Configure email notifications from a verified domain and monitor failures.
- Add webhook processing with raw-body HMAC verification, idempotency and reconciliation before relying on payment webhooks.
- Never mark an order fulfilled based only on a browser redirect or signature callback; verify captured payment state server-side and reconcile it with the provider dashboard.
- Test backups, access removal, incident handling and customer-data deletion/retention rules.

## Environment variables
See `.env.example`. Never expose service-role keys, Razorpay secrets, webhook secrets or email API keys to the browser or Git.

## References
- Next.js deployment: https://nextjs.org/docs/app/getting-started/deploying
- Next.js environment variables: https://nextjs.org/docs/app/guides/environment-variables
- Supabase Next.js quickstart: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- Razorpay test/live separation: https://razorpay.com/docs/
