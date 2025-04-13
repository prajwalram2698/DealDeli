document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // This stops the page from refreshing when the form is submitted.
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    console.log("Email: " + email + " Password: " + password); // This just shows the email and password in the console for now.
  });

  // Toggle the Slide-Out Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) {
      console.error('Sidebar element not found!');
      return;
    }
    
    // Toggle the sidebar's active class
    sidebar.classList.toggle('active');
    
    // If the sidebar is now active, attach an event listener for outside clicks.
    if (sidebar.classList.contains('active')) {
      // Use a timeout to prevent the immediate click from closing the sidebar.
      setTimeout(() => {
        document.addEventListener('click', closeSidebarOnOutsideClick);
      }, 0);
    } else {
      // Remove the event listener when sidebar is closed.
      document.removeEventListener('click', closeSidebarOnOutsideClick);
    }
  }
  
  function toggleCategoriesDropdown(event) {
    // Prevent the event from bubbling up so it doesn't trigger the outside click listener immediately
    event.stopPropagation();
    
    // Get the closest dropdown container
    const container = event.currentTarget.closest('.dropdown-container');
    const dropdown = container.querySelector('.categories-dropdown');
    
    if (dropdown) {
      // Toggle the active class
      dropdown.classList.toggle('active');
      
      if (dropdown.classList.contains('active')) {
        // If dropdown is now active, add an event listener to detect outside clicks
        // Use a timeout so that the click that opened the dropdown doesn't immediately close it.
        setTimeout(() => {
          document.addEventListener('click', closeCategoriesDropdownOnOutsideClick);
        }, 0);
      } else {
        // If the dropdown is closed, remove the outside click listener
        document.removeEventListener('click', closeCategoriesDropdownOnOutsideClick);
      }
    } else {
      console.error('Categories dropdown not found!');
    }
  }
  
  function closeCategoriesDropdownOnOutsideClick(e) {
    // Get the dropdown container (assuming there's only one)
    const container = document.querySelector('.dropdown-container');
    if (container && !container.contains(e.target)) {
      // If the click target is outside the dropdown container, close the dropdown
      const dropdown = container.querySelector('.categories-dropdown');
      if (dropdown && dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
      }
      // Remove the event listener after closing
      document.removeEventListener('click', closeCategoriesDropdownOnOutsideClick);
    }
  }
  
  

  // Function to close sidebar when clicking outside
  function closeSidebarOnOutsideClick(e) {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger-menu');
    
    // If the sidebar is active and the click target is NOT inside the sidebar or the hamburger, close it.
    if (sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) &&
        !hamburger.contains(e.target)) {
      sidebar.classList.remove('active');
      document.removeEventListener('click', closeSidebarOnOutsideClick);
    }
  }
  
// Open the Categories Modal
function openCategoriesModal() {
    const modal = document.getElementById('categories-modal');
    if (modal) {
      modal.classList.add('active');
    } else {
      console.error('Categories modal not found!');
    }
  }
  
  // Close the Categories Modal
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
    event.stopPropagation(); // Prevent the event from bubbling up
    // Find the closest dropdown container for brands
    const container = event.currentTarget.closest('.dropdown-container.brands');
    const dropdown = container.querySelector('.brands-dropdown');
    if (dropdown) {
      dropdown.classList.toggle('active');
      // Optional: add an outside click listener if you want it to close on outside click:
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
    // Find the container for the brands dropdown (assume there's only one)
    const container = document.querySelector('.dropdown-container.brands');
    if (container && !container.contains(e.target)) {
      const dropdown = container.querySelector('.brands-dropdown');
      if (dropdown && dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
      }
      document.removeEventListener('click', closeBrandsDropdownOnOutsideClick);
    }
  }
  

   // Sample Data (this will be populated with the actual data)
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
    },
    // Add more product data here
  ];
  
  // Function to display the products in categories
  function displayProducts() {
    // Get the sections for each category
    const freshFoodSection = document.getElementById('fresh-food-list');
    const beveragesSection = document.getElementById('beverages-list');
    const snacksSection = document.getElementById('snacks-list');
  
    // Loop through the products and categorize them
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product-item');
      
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Price: £${product.price}</p>
        <a href="${product.link}" target="_blank">View Product</a>
      `;
  
      // Add the product to the correct category
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
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery)
    );
  
    // Clear the product lists
    document.getElementById('fresh-food-list').innerHTML = '';
    document.getElementById('beverages-list').innerHTML = '';
    document.getElementById('snacks-list').innerHTML = '';
  
    // Display filtered products
    filteredProducts.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product-item');
      
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Price: £${product.price}</p>
        <a href="${product.link}" target="_blank">View Product</a>
      `;
      
      if (product.category === "Fresh Food") {
        document.getElementById('fresh-food-list').appendChild(productElement);
      } else if (product.category === "Beverages") {
        document.getElementById('beverages-list').appendChild(productElement);
      } else if (product.category === "Snacks") {
        document.getElementById('snacks-list').appendChild(productElement);
      }
    });
  }
  
  document.getElementById('reset-password-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission until validation passes
  
    // Get input values
    const emailInput = document.getElementById('email');
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');
  
    // Clear any previous error messages
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
  
    // If all validations pass, you can either submit the form using AJAX or proceed further
    // For demonstration, we'll simply log a success message
    console.log('Form is valid. Proceed with resetting the password.');
    
    // Optionally, submit the form data via AJAX or allow the form to be submitted:
    // e.target.submit();
  });
  

  // Call the displayProducts function to show products when the page loads
  window.onload = displayProducts;

