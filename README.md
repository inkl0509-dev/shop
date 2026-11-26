# Online Shop (MVR, bank transfer)

One-page online shop with a **customer portal** and an **admin portal**.

**Customers:** see the shop's ads in a slider at the top, browse items with photos and prices grouped by category, choose how to buy (e.g. loose by the kg or a 5 kg bag, a bottle or a case), sort by name or price, search, add to bag, check out, see the shop's bank account and the amount, upload the transfer receipt (photo, screenshot or PDF), and follow the order:
Order placed → Receipt sent → Payment received → Preparing → On the way → Delivered.
When delivered they see the shop's thank-you message. Once payment is confirmed they can download an official **PDF invoice**.

**Admin (`#admin`):**
- **Orders** – receipts to check, in progress, completed. Open an order to see the receipt, then *Confirm payment* or *Reject receipt* (with a reason the customer sees), *Start preparing*, *Send for delivery*, *Mark delivered*, or *Cancel*. Download the invoice.
- **Products** – add, edit, delete, photo, category, description, in stock / sold out, and **how it's sold**: one or more options, each with its own price:
  - *Piece / pack* – counted in whole numbers (e.g. Single egg, Tray of 30, Bottle, Case of 12, 5 kg bag)
  - *Kg (loose)* or *Litre (loose)* – sold by weight or volume, in steps you choose (e.g. rice loose, 0.5 kg steps)
- **Ads** – banners for the top of the shop: wide photo (about 1600 × 500), optional headline, text and a button to a category; show/hide and reorder.
- **GST report** – MIRA 205 figures per quarter or month, PDF and CSV downloads (see below).
- **Shop settings** – shop name, logo, app colours (10 ready-made themes, your own main and accent colours, or "Match my logo", with a live preview), tagline, phone, Viber/WhatsApp, email, address, opening hours, bank accounts, delivery fee, GST %, thank-you message, business registration no., TIN, invoice footer.

## GST (Maldives, general sector)
Turn it on in **Shop settings → GST (Maldives)**: GST registration, rate (8%), GST TIN, taxable activity number and name, and taxable period (quarterly, or monthly if taxable sales are over MVR 1 million a month).

- Each product has a **GST** setting: *Standard rate*, *Zero-rated (0%)* (Schedule 1 essentials such as rice, sugar, flour, salt, milk, cooking oil, eggs, tea leaves, fish packed in the Maldives, potatoes, onions, fruits, bread – see MIRA's GST Food Guide, MIRA G821) or *Exempt*.
- GST is added at checkout on standard-rated items **and the delivery fee**. Prices you enter are **before GST**.
- Invoices become **TAX INVOICE** with your GST TIN, the customer's business name and GST TIN (optional field at checkout), quantity, unit price and value excluding GST, the GST rate per line, and the GST amount.
- **Admin → GST report** fills in **MIRA 205** page 1 for the chosen period: Box 1 sales at 8% (incl. GST), Box 2 zero-rated, Box 3 exempt, Box 5 total, Box 6 output tax (Box 1 × 8/108), and Box 10 liability after you enter **input tax (Box 7)** from your purchase invoices, plus Boxes 8, 9 and plastic bag fees. It shows the filing deadline (28th of the following month; moved to the next working day if it falls on a Friday or Saturday — check public holidays yourself), lists every tax invoice in the period, and downloads a **PDF report** and a **CSV sales listing**.
- Orders count in the period in which the payment was confirmed (the tax invoice date).
- This app records your shop's sales only. Purchases/input tax, credit notes and anything outside the app must be added by you. Check the figures before filing on MIRAconnect.

Without Firebase settings the app runs as a **demo in one browser** (switch between Customer and Admin with the bar at the bottom).

## Set up Firebase (free Spark plan is enough)
Photos, logos and receipts are compressed and stored inside Firestore, so Firebase Storage (paid plan) is not needed.

1. https://console.firebase.google.com → create a project (or reuse the Day End project).
2. **Authentication → Sign-in method** → enable **Email/Password**.
3. **Firestore Database** → create (production mode).
4. **Firestore → Rules** → paste `firestore.rules` → **Publish**.
5. **Project settings → Your apps → Web** → copy the config into `firebase-config.js`.
6. **Authentication → Settings → Authorized domains** → add your Vercel domain.

### Make yourself admin
1. Open the shop and **Create account** with your mobile number (as a customer).
2. Firebase console → **Authentication → Users** → copy your **User UID**.
3. **Firestore → Data** → collection `users` → document ID = that UID → field `role` = `admin`.
4. Reload the shop: an **Admin** link appears in the top bar (or go to `/#admin`).
5. Fill in **Shop settings** (name, logo, bank account…) and add your **Products**.

Customers sign up themselves with **mobile number + password** (no SMS needed).

## Deploy on Vercel
Push this folder to GitHub → vercel.com → **Add New → Project** → import → Framework preset **Other** → Deploy.

## Notes
- Prices in an order are taken from the product list when the customer checks out. Always check the amount on the receipt against the order total before you confirm payment.
- Receipt PDFs are limited to 650 KB; photos are resized automatically.

---

# Day End Sheet (`/eod`)

A separate app in the same repo and the same Firebase project, at **`https://your-site.vercel.app/eod`**.
It does not link to the shop, and the shop does not link to it. It shares only `firebase-config.js` and the Firebase project.

**Kept apart from the shop**
- Reports are saved in their own collection **`eodReports`** (one document per day, `YYYY-MM-DD`).
- Access is controlled by its own list **`eodStaff`**. Shop admins and shop customers have **no** access unless they are added here.
- Roles: **admin** can open and change any day (including opening petty cash) and manage staff; **staff** can only fill in and save **today's** sheet. Enforced by `firestore.rules`.

**What it does:** spreadsheet-style day end in MVR: opening petty cash (locked, from the previous day), today's drawer count by denomination, petty cash for tomorrow by denomination, balance to deposit per note/coin, card sales, transfers, pay outs and expenses from the drawer, cash sales, total sales, POS check, notes, saved reports, copy and CSV export. Works on phones.

## Set up the day end sheet
1. Make sure `firestore.rules` from this repo is published (it contains both apps' rules).
2. Open `/eod`, choose **Create an account** (name, mobile number, password). You'll see **Waiting for access** and a **staff code**.
3. In the Firebase console → **Firestore → Data** → create collection **`eodStaff`** → document ID = that staff code → fields `role` = `admin`, `name` = your name. (Only needed once, for the first admin.)
4. Reload `/eod`. You're in as **Admin**. From now on add people in the app: they create an account on `/eod`, send you their staff code, and you add it under **Staff** (choose Staff or Admin). Remove access with ×.

Same mobile number + password works for both apps if a person uses both (one Firebase account), but each app has its own access list.
