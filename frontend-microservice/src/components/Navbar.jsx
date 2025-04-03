import React, { useState } from 'react';




const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userAction, setUserAction] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storeAction, setStoreAction] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleUserAction = (e) => {
    const action = e.target.value;
    setUserAction(action);
    
    // Handle different actions
    if (action === 'login') {
      setIsLoggedIn(true);
    } else if (action === 'logout') {
      setIsLoggedIn(false);
    } else if (action) {
      // Navigate to the selected action (in a real app, you'd use router here)
      console.log(`Navigating to: ${action}`);
    }
  };

  const handleStoreSelection = (e) => {
    const store = e.target.value;
    setStoreAction(store);
    
    if (store) {
      console.log(`Navigating to ${store} store page`);
      // Here you would implement actual navigation to the store page
    }
  };

  return (
    <header>
      <div className='nav-bar'>
        <div className="brand">
          <div className="logo">
          <link rel="icon" type="image" href="/public/Logo.jpg" />
          </div>
          <span className="brand-name">DealDeli</span>
        </div>
        
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input 
              type='text' 
              placeholder='Search and compare' 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <button type="submit">
              <i className="search-icon">🔍</i>
           
            </button>
          </form>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li className="stores-dropdown">
              <select 
                value={storeAction} 
                onChange={handleStoreSelection}
                className="stores-select"
              >
                <option value="">Stores</option>
                <option value="tesco">Tesco</option>
                <option value="sainsbury">Sainsbury's</option>
                <option value="aldi">Aldi</option>
                <option value="asda">Asda</option>
              </select>
            </li>
            <li><a href="/deals">Deals</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </nav>
        
        <div className="user-actions">
          <div className="account-dropdown">
            <select 
              value={userAction} 
              onChange={handleUserAction}
              className="account-select"
            >
              <option value="">👤 {isLoggedIn ? 'My Account' : 'Account'}</option>
              
              {isLoggedIn ? (
                <>
                  <option value="profile" >My Profile</option>
                  <option value="logout">Logout</option>
                </>
              ) : (
                <>
                  <option value="login">Login</option>
                 
          
                  <option value="register" >Register</option>
                  
                </>
              )}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;