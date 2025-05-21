// ================== USER AUTHENTICATION FORMS ==================

// Login form handler
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    fetch('http://localhost:5001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => { alert(data.message); })
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
    // Clear previous error
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    // Validate email using built-in HTML5 validation
    if (!emailInput.checkValidity()) {
      errorMessage.textContent = 'Please enter a valid email address.';
      errorMessage.style.display = 'block';
      return;
    }
    // Check if new password and confirm password match
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
    const first_name = document.getElementById('first-name').value;
    const last_name = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    // Simple client-side validation
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

// ================== SIDEBAR & DROPDOWN LOGIC ==================

// Toggle the Slide-Out Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) {
    console.error('Sidebar element not found!');
    return;
  }
  sidebar.classList.toggle('active');
  if (sidebar.classList.contains('active')) {
    setTimeout(() => {
      document.addEventListener('click', closeSidebarOnOutsideClick);
    }, 0);
  } else {
    document.removeEventListener('click', closeSidebarOnOutsideClick);
  }
}

// Toggle Categories Dropdown
function toggleCategoriesDropdown(event) {
  event.stopPropagation();
  const container = event.currentTarget.closest('.dropdown-container');
  const dropdown = container.querySelector('.categories-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
    if (dropdown.classList.contains('active')) {
      setTimeout(() => {
        document.addEventListener('click', closeCategoriesDropdownOnOutsideClick);
      }, 0);
    } else {
      document.removeEventListener('click', closeCategoriesDropdownOnOutsideClick);
    }
  } else {
    console.error('Categories dropdown not found!');
  }
}

function closeCategoriesDropdownOnOutsideClick(e) {
  const container = document.querySelector('.dropdown-container');
  if (container && !container.contains(e.target)) {
    const dropdown = container.querySelector('.categories-dropdown');
    if (dropdown && dropdown.classList.contains('active')) {
      dropdown.classList.remove('active');
    }
    document.removeEventListener('click', closeCategoriesDropdownOnOutsideClick);
  }
}

// Close sidebar when clicking outside
function closeSidebarOnOutsideClick(e) {
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger-menu');
  if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    sidebar.classList.remove('active');
    document.removeEventListener('click', closeSidebarOnOutsideClick);
  }
}

// Open and Close Categories Modal
function openCategoriesModal() {
  const modal = document.getElementById('categories-modal');
  if (modal) {
    modal.classList.add('active');
  } else {
    console.error('Categories modal not found!');
  }
}
function closeCategoriesModal() {
  const modal = document.getElementById('categories-modal');
  if (modal) {
    modal.classList.remove('active');
  } else {
    console.error('Categories modal not found!');
  }
}

// Brand Dropdown
function toggleBrandsDropdown(event) {
  event.stopPropagation();
  const container = event.currentTarget.closest('.dropdown-container.brands');
  const dropdown = container.querySelector('.brands-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
    if (dropdown.classList.contains('active')) {
      setTimeout(() => {
        document.addEventListener('click', closeBrandsDropdownOnOutsideClick);
      }, 0);
    } else {
      document.removeEventListener('click', closeBrandsDropdownOnOutsideClick);
    }
  } else {
    console.error('Brands dropdown not found!');
  }
}
function closeBrandsDropdownOnOutsideClick(e) {
  const container = document.querySelector('.dropdown-container.brands');
  if (container && !container.contains(e.target)) {
    const dropdown = container.querySelector('.brands-dropdown');
    if (dropdown && dropdown.classList.contains('active')) {
      dropdown.classList.remove('active');
    }
    document.removeEventListener('click', closeBrandsDropdownOnOutsideClick);
  }
}

// ================== PRODUCT DISPLAY & SEARCH ==================

// Sample Data (replace with actual data as needed)
const products = [
  {
    name: "Nature's Pick Royal Gala Apples 6 Pack",
    price: 1.49,
    category: "Fresh Food",
    image: "https://aldprdproductimages.azureedge.net/media/11111.jpg",
    link: "https://groceries.aldi.co.uk/en-GB/p-natures-pick-royal-gala-apples-6-pack"
  },
  {
    name: "ASDA Sweet & Juicy Royal Gala Apples",
    price: 1.49,
    category: "Fresh Food",
    image: "https://example.com/image.jpg",
    link: "https://groceries.asda.com/product/apples"
  }
  // Add more product data here
];

// Function to display the products in categories
function displayProducts() {
  const freshFoodSection = document.getElementById('fresh-food-list');
  const beveragesSection = document.getElementById('beverages-list');
  const snacksSection = document.getElementById('snacks-list');
  if (!freshFoodSection || !beveragesSection || !snacksSection) return;

  // Clear previous content
  freshFoodSection.innerHTML = '';
  beveragesSection.innerHTML = '';
  snacksSection.innerHTML = '';

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product-item');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="max-width:100px;"><br>
      <strong>${product.name}</strong><br>
      Price: £${product.price}<br>
      <a href="${product.link}" target="_blank">View Product</a>
    `;
    if (product.category === "Fresh Food") {
      freshFoodSection.appendChild(productElement);
    } else if (product.category === "Beverages") {
      beveragesSection.appendChild(productElement);
    } else if (product.category === "Snacks") {
      snacksSection.appendChild(productElement);
    }
  });
}

// Search products based on input
function searchProducts() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;
  const searchQuery = searchInput.value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery) ||
    product.category.toLowerCase().includes(searchQuery)
  );

  // Clear the product lists
  const freshFoodSection = document.getElementById('fresh-food-list');
  const beveragesSection = document.getElementById('beverages-list');
  const snacksSection = document.getElementById('snacks-list');
  if (!freshFoodSection || !beveragesSection || !snacksSection) return;

  freshFoodSection.innerHTML = '';
  beveragesSection.innerHTML = '';
  snacksSection.innerHTML = '';

  filteredProducts.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product-item');
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="max-width:100px;"><br>
      <strong>${product.name}</strong><br>
      Price: £${product.price}<br>
      <a href="${product.link}" target="_blank">View Product</a>
    `;
    if (product.category === "Fresh Food") {
      freshFoodSection.appendChild(productElement);
    } else if (product.category === "Beverages") {
      beveragesSection.appendChild(productElement);
    } else if (product.category === "Snacks") {
      snacksSection.appendChild(productElement);
    }
  });
}

// Call the displayProducts function to show products when the page loads (if on index)
window.onload = function() {
  if (document.getElementById('fresh-food-list')) {
    displayProducts();
  }
};
