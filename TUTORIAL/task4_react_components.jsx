/*
  TASK 4: Analyze a UI and decompose it into reusable React components
  ---------------------------------------------------------------------
  UI CHOSEN: A simple "Product Dashboard" page containing:
    - A Header (logo + title)
    - A Search bar
    - A grid of Product Cards (image, name, price, Add to Cart button)
    - A Footer

  COMPONENT HIERARCHY (top to bottom):

  App
   ├── Header
   ├── SearchBar
   ├── ProductList
   │      └── ProductCard   (reused multiple times, one per product)
   │             └── Button (reused inside ProductCard, and could be reused elsewhere)
   └── Footer

  WHY EACH IS ITS OWN COMPONENT (reusability reasoning):
   - Header: appears once, but separated because it's a distinct visual/logical section.
   - SearchBar: could be reused on other pages (e.g., search products, search orders).
   - ProductList: manages the array of products and loops through them.
   - ProductCard: REUSABLE — same component renders for every single product,
     just with different props (name, price, image).
   - Button: REUSABLE — a generic button component so "Add to Cart", "Buy Now",
     "Submit" etc. all share consistent styling/behavior instead of repeating code.

  This file is plain JSX-style code to illustrate the structure/hierarchy for
  your assignment. It is written as separate components with props, exactly
  how you would organize files in a real React project (each component would
  normally live in its own file like Header.jsx, ProductCard.jsx, etc.)
*/

import React, { useState } from "react";

/* ---------------- 1. Button (reusable, generic) ---------------- */
function Button({ label, onClick, color = "#2563eb" }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: color,
        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

/* ---------------- 2. ProductCard (reusable, receives props) ---------------- */
function ProductCard({ name, price, image, onAddToCart }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        width: "200px",
        textAlign: "center",
      }}
    >
      <img src={image} alt={name} style={{ width: "100%", borderRadius: "6px" }} />
      <h3>{name}</h3>
      <p>₹{price}</p>
      <Button label="Add to Cart" onClick={() => onAddToCart(name)} />
    </div>
  );
}

/* ---------------- 3. ProductList (parent that maps over data) ---------------- */
function ProductList({ products, onAddToCart }) {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

/* ---------------- 4. SearchBar (its own reusable component) ---------------- */
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
    />
  );
}

/* ---------------- 5. Header (simple presentational component) ---------------- */
function Header() {
  return (
    <header style={{ padding: "15px", background: "#111", color: "white" }}>
      <h1>My Shop</h1>
    </header>
  );
}

/* ---------------- 6. Footer (simple presentational component) ---------------- */
function Footer() {
  return (
    <footer style={{ padding: "15px", textAlign: "center", color: "#666" }}>
      © 2026 My Shop. All rights reserved.
    </footer>
  );
}

/* ---------------- 7. App (top-level parent, holds state) ---------------- */
export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: 1, name: "Wireless Mouse", price: 599, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Keyboard", price: 1299, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Headphones", price: 1999, image: "https://via.placeholder.com/150" },
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleAddToCart(productName) {
    alert(`${productName} added to cart!`);
  }

  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
      </div>
      <Footer />
    </div>
  );
}
