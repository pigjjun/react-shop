import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "../../styles/ProductSearch.css";

function ProductSearch() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="product-search-container">
      <FaSearch className="search-icon" />
      <input
        className="search-input"
        type="text"
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      {searchTerm.length > 0 && (
        <ul className="search-results">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <a href={`/products/${product.id}`}>{product.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductSearch;
