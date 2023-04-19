import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://fakestoreapi.com/products");
      setProducts(result.data);
    };
    fetchData();
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.category.toLowerCase() === selectedCategory
        );

  return (
    <div className="product-list">
      <h2 className="product-list-title">All Products</h2>
      <div className="product-list__grid">
        {filteredProducts.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className="product"
          >
            <img src={product.image} alt={product.title} />
            <div className="product__detail">
              <h3 className="product__title">{product.title}</h3>
              <p className="product__price">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
