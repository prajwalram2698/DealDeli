import React, { useState } from 'react';

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  const products = [
    { id: 1, name: "Milk", category: "Dairy" },
    { id: 2, name: "Vegetables", category: "Fresh Food" },
    { id: 3, name: "Nescafé Gold Blend", category: "Food and Bevrages" },
    { id: 4, name: "Eggs", category: "Poultry & Meat" },
    { id: 5, name: "Shampoo ", category: "Health & Beauty" },
  ];

  return (
    <div className="sidebar-container">
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
        <div className="sidebar-header">
          {isOpen && <h2 className="sidebar-title">Products</h2>}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="toggle-button"
          >
            {isOpen ? '⋮' : '⋯'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {products.map((product) => (
            <a 
              key={product.id} 
              href={`#${product.id}`}
              className="sidenav-item"
            >
              <span className="sidenav-item-bullet">•</span>
              {isOpen ? (
                <div className="sidenav-item-content">
                  <div className="sidenav-item-title">{product.name}</div>
                  <div className="sidenav-item-category">{product.category}</div>
                </div>
              ) : (
                <span>{product.id}</span>
              )}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SidebarMenu;