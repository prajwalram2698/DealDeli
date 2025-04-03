import React from "react";

const groceries = [
  { id: 1, name: "Milk", price: "$2.99", imgage : "Product images/milk.png" },
  { id: 2, name: "Bananas", price: "$1.49", image: "https://via.placeholder.com/100" },
  { id: 3, name: "Carrots", price: "$1.99", image: "https://via.placeholder.com/100" },
  { id: 4, name: "Tomatoes", price: "$2.50", image: "https://via.placeholder.com/100" },
  { id: 5, name: "Milk", price: "$3.99", image: "https://via.placeholder.com/100" },
];

function ProductList() {
  return (
    <div className="container">
      <h3>Groceries </h3>
      <div className="grocery-list">
        {groceries.map((item) => (
          <div className="grocery-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
