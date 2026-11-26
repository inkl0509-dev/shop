// Firebase settings for the online shop.
// Firebase console → Project settings → General → Your apps → Web app → copy the config here.
// While apiKey is "YOUR_API_KEY" the shop runs as a local demo (data stays in that browser).
// This web config is not secret; access is protected by firestore.rules.
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyA4kZBWFNJ3dHOb0i4hSJg5V9ov2yaN--A",
  authDomain: "retailonline-73166.firebaseapp.com",
  projectId: "retailonline-73166",
  storageBucket: "retailonline-73166.firebasestorage.app",
  messagingSenderId: "82991057620",
  appId: "1:82991057620:web:a5af2ab1d0328a1b01c941",
  measurementId: "G-7T86JM4QHZ"
  // Customers and admins sign in with mobile number + password; accounts are <number>@shop.local
  loginDomain: "shop.local"
};
