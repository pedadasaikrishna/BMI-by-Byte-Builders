import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOYMVxySSSoSD0XqmadzzFedU1jjkJV6E",
  authDomain: "saikrishna-e2c71.firebaseapp.com",
  databaseURL: "https://saikrishna-e2c71-default-rtdb.firebaseio.com",
  projectId: "saikrishna-e2c71",
  storageBucket: "saikrishna-e2c71.appspot.com", // Corrected this line
  messagingSenderId: "136963885829",
  appId: "1:136963885829:web:ea4476388c19a37795c56c",
  measurementId: "G-52WNM7FWZW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Redirect based on auth state
onAuthStateChanged(auth, user => {
  const path = window.location.pathname;
  
  if (user && (path.includes('login.html') || path.includes('signup.html'))) {
    window.location.href = 'dashboard.html';
  } else if (!user && path.includes('dashboard.html')) {
    window.location.href = 'login.html';
  }
});

// Logout function with error handling
window.logout = () => {
  signOut(auth)
    .then(() => {
      window.location.href = 'login.html';
    })
    .catch(error => {
      console.error('Logout error:', error);
      alert('Error logging out. Please try again.');
    });
};

