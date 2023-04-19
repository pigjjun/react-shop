import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../../styles/ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(result.data);
    };
    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.id === product.id);
    if (index === -1) {
      cart.push({ id: product.id, count: 1 });
    } else {
      cart[index].count += 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  if (!product) {
    return <div className="product-detail__loading">Loading...</div>;
  }

  return (
    <div className="product-detail">
      <img
        className="product-detail__image"
        src={product.image}
        alt={product.title}
      />
      <div className="product-detail-card">
        <h2 className="product-detail__title">{product.title}</h2>
        <p className="product-detail__description">{product.description}</p>
        <p className="product-detail__price">${product.price}</p>
        <button className="product-detail__button" onClick={handleAddToCart}>
          장바구니에 담기
        </button>
        <Link to="/cart" className="product-detail__cart-button">
          <button>장바구니로 이동</button>
        </Link>
      </div>
      {isModalOpen && (
        <div className="product-detail__modal">
          <div className="product-detail__modal-content">
            <p>장바구니에 담았습니다!</p>
            <button onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
