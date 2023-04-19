import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Products.css";

const Products = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = category
        ? `https://fakestoreapi.com/products/category/${category.toLowerCase()}`
        : "https://fakestoreapi.com/products";
      const result = await axios.get(url);
      setProducts(result.data);
    };
    fetchData();
  }, [category]);

  return (
    <div className="products">
      <h2>{category ? `${category} Products` : "All Products"}</h2>
      <div className="products__container">
        {products.map((product) => (
          <div key={product.id} className="products__item">
            <img src={product.image} alt={product.title} />
            <div className="products__item__info">
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
