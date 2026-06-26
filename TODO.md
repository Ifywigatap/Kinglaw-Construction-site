# TODO - App review & fixes

## Step 1: Verify Vercel backend wiring
- Confirm how `/api/contact` and `/api/inquiry` are implemented in the repo/deployment.
- If missing, add Vercel serverless functions (API routes) for contact/inquiry.

## Step 2: Fix navbar phone number source
- Update `src/layout/Navbar.jsx` to use `defaultPhoneNumber` (or `COMPANY_CONTACT.phone`) from config/constants.

## Step 3: Ensure ContactForm backend contract matches
- Confirm payload fields: `{ name, email, subject, message, _hp }`.
- Ensure serverless handlers validate required fields and handle honeypot.

## Step 4: Run checks
- `npm run lint`
- `npm run build`

## Step 5: Quick manual sanity checks
- Load `/contact` and submit a valid form.
- Submit with honeypot `_hp` filled (should not send mail, but should return success).

