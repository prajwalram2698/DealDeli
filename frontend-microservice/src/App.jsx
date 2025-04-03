import React from 'react';
import Navbar from './components/Navbar';
import './index.css'
import SidebarMenu from './components/SidebarMenu';
import ProductList from './components/Products/ProductList';

function App() {
  return (
    <div className="App">
      <Navbar />
      
      {/* <Login/>
      <Register/> */}
      <main className='main-container'>
      <SidebarMenu />
        <ProductList></ProductList>
      </main>
      <footer className='footer' >
        <p>&copy; 2025 DealDeli. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;