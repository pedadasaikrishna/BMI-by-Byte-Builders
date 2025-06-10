import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const auth = getAuth(); // Ensure Firebase app is already initialized elsewhere
const form = document.getElementById('signup-form');
const errorMsg = document.getElementById('error-msg');

form.addEventListener('submit', async e => {
  e.preventDefault();
  errorMsg.textContent = '';

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const pwd = form.password.value;

  if (!name) {
    errorMsg.textContent = 'Please enter your Name.';
    return;
  }
  if (!email) {
    errorMsg.textContent = 'Please enter your email.';
    return;
  }
  if (!pwd || pwd.length < 6) {
    errorMsg.textContent = 'Password must be at least 6 characters.';
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
    const user = userCredential.user;

    // 🔄 Update the user's display name
    await updateProfile(user, {
      displayName: name
    });
    localStorage.setItem('userName', name);

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
  } catch (err) {
    errorMsg.textContent = err.message;
  }
});
