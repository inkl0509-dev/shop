// Firebase settings for the online shop.
// Firebase console → Project settings → General → Your apps → Web app → copy the config here.
// While apiKey is "YOUR_API_KEY" the shop runs as a local demo (data stays in that browser).
// This web config is not secret; access is protected by firestore.rules.
window.FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "",
  appId: "",
  // Customers and admins sign in with mobile number + password; accounts are <number>@shop.local
  loginDomain: "shop.local"
};
