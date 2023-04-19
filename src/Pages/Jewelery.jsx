import React, { useState, useEffect } from "react";
import "../styles/ProductList.css";
import { Link } from "react-router-dom";

function Jewelery() {
  const [jeweleryProducts, setJeweleryProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/jewelery")
      .then((res) => res.json())
      .then((data) => setJeweleryProducts(data));
  }, []);

  return (
    <div className="product-list">
      <h2 className="product-list-title">액세서리</h2>
      <div className="product-list__grid">
        {jeweleryProducts.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="product"
          >
            <img src={product.image} alt={product.title} />

            <h3 className="product__title">{product.title}</h3>
            <p className="product__price">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Jewelery;
