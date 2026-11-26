# Online Shop (MVR, bank transfer)

One-page online shop with a **customer portal** and an **admin portal**.

**Customers:** see the shop's ads in a slider at the top, browse items with photos and prices grouped by category, sort by name or price, search, add to bag, check out, see the shop's bank account and the amount, upload the transfer receipt (photo, screenshot or PDF), and follow the order:
Order placed → Receipt sent → Payment received → Preparing → On the way → Delivered.
When delivered they see the shop's thank-you message. Once payment is confirmed they can download an official **PDF invoice**.

**Admin (`#admin`):**
- **Orders** – receipts to check, in progress, completed. Open an order to see the receipt, then *Confirm payment* or *Reject receipt* (with a reason the customer sees), *Start preparing*, *Send for delivery*, *Mark delivered*, or *Cancel*. Download the invoice.
- **Products** – add, edit, delete, photo, price, category, description, in stock / sold out.
- **Ads** – banners for the top of the shop: wide photo (about 1600 × 500), optional headline, text and a button to a category; show/hide and reorder.
- **Shop settings** – shop name, logo, app colours (10 ready-made themes, your own main and accent colours, or "Match my logo", with a live preview), tagline, phone, Viber/WhatsApp, email, address, opening hours, bank accounts, delivery fee, GST %, thank-you message, business registration no., TIN, invoice footer.

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
- If the Day End Sales Report uses the same Firebase project, its rules are already included at the bottom of `firestore.rules`; customer accounts cannot read or write day-end reports.
