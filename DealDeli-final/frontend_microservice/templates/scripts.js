// ================== USER AUTHENTICATION FORMS ==================

const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    fetch('http://localhost:5001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
      if (status === 200) {
        // Store user's first name in localStorage
        localStorage.setItem('firstName', body.first_name || '');
        alert(`Login successful! Welcome, ${body.first_name || 'User'}!`);
        window.location.href = 'index.html';
      } else {
        alert(body.message || 'Login failed.');
      }
    })
    .catch(error => {
      console.error('Login error:', error);
      alert('Something went wrong during login.');
    });
  });
}



// Reset password form handler
const resetPasswordForm = document.getElementById('reset-password-form');
if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    if (!emailInput.checkValidity()) {
      errorMessage.textContent = 'Please enter a valid email address.';
      errorMessage.style.display = 'block';
      return;
    }
    if (newPassword !== confirmPassword) {
      errorMessage.textContent = 'Passwords do not match.';
      errorMessage.style.display = 'block';
      return;
    }

    fetch('http://localhost:5001/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailInput.value, new_password: newPassword, confirm_password: confirmPassword })
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
      if (status === 200) {
        alert(body.message);
        // Redirect to login page after successful reset
        window.location.href = 'login.html'; // Change this if your login page has a different path
      } else {
        errorMessage.textContent = body.message;
        errorMessage.style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Reset error:', error);
      errorMessage.textContent = 'An unexpected error occurred.';
      errorMessage.style.display = 'block';
    });
  });
}


// Register form handler
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const first_name = document.getElementById('first-name').value.trim();
    const last_name = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    if (password !== confirm_password) {
      errorMessage.textContent = 'Passwords do not match.';
      errorMessage.style.display = 'block';
      return;
    }

    fetch('http://localhost:5001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name, last_name, email, password, confirm_password })
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
      if (status === 201) {
        successMessage.textContent = body.message;
        successMessage.style.display = 'block';
        // Redirect to login page after a short delay (e.g., 1 second)
        setTimeout(() => {
          window.location.href = 'login.html'; // Change this if your login page has a different path
        }, 1000);
      } else {
        errorMessage.textContent = body.message || 'Registration failed.';
        errorMessage.style.display = 'block';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      errorMessage.textContent = 'An unexpected error occurred.';
      errorMessage.style.display = 'block';
    });
  });
}

