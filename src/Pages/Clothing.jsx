import React, { useState, useEffect } from "react";
import "../styles/ProductList.css";
import { Link } from "react-router-dom";

function Clothing() {
  const [menProducts, setMenProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/men's clothing")
      .then((res) => res.json())
      .then((data) => setMenProducts(data));
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/women's clothing")
      .then((res) => res.json())
      .then((data) => setWomenProducts(data));
  }, []);

  return (
    <div className="product-list-container">
      <div className="product-list">
        <h2 className="product-list-title">남성의류</h2>
        <div className="product-list__grid">
          {menProducts.map((product) => (
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
        <h2 className="product-list-title">여성의류</h2>
        <div className="product-list__grid">
          {womenProducts.map((product) => (
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
    </div>
  );
}

export default Clothing;
