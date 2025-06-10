import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const auth = getAuth();
const form = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');

form.addEventListener('submit', async e => {
  e.preventDefault();
  errorMsg.textContent = '';

  const email = form.email.value.trim();
  const pwd = form.password.value;

  // Basic validation
  if (!email) {
    errorMsg.textContent = 'Please enter your email.';
    return;
  }
  if (!pwd) {
    errorMsg.textContent = 'Please enter your password.';
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, pwd);
    window.location.href = 'dashboard.html'; s
  } catch (err) {
    // Optional: friendly error messages
    switch (err.code) {
      case 'auth/user-not-found':
        errorMsg.textContent = 'No user found with this email.';
        break;
      case 'auth/wrong-password':
        errorMsg.textContent = 'Incorrect password.';
        break;
      case 'auth/invalid-email':
        errorMsg.textContent = 'Invalid email format.';
        break;
      default:
        errorMsg.textContent = err.message;
    }
  }
});
