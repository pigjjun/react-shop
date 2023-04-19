import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Cart.css";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemIdToRemove, setItemIdToRemove] = useState(null);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await Promise.all(
        cart.map(async (item) => {
          const product = await axios.get(
            `https://fakestoreapi.com/products/${item.id}`
          );
          return { ...product.data, count: item.count };
        })
      );
      setCartItems(items);
    };
    fetchCartItems();
  }, [cart]);

  const handleRemoveConfirmed = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: { count: updatedCart.length } })
    );
    setModalOpen(false);
  };

  const handleRemoveFromCart = (id) => {
    setModalOpen(true);
    setItemIdToRemove(id);
  };

  const handleDecreaseCount = (id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id && item.count > 1) {
        item.count--;
      }
      return item;
    });
    const updatedCart = updatedCartItems.map((item) => ({
      id: item.id,
      count: item.count,
    }));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCartItems);
  };

  const handleIncreaseCount = (id) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        item.count++;
      }
      return item;
    });
    const updatedCart = updatedCartItems.map((item) => ({
      id: item.id,
      count: item.count,
    }));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCartItems);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setItemIdToRemove(null);
  };

  const handleBuyButtonClick = () => {
    setModalOpen(true);
    setItemIdToRemove(null);
  };

  const numItems = cartItems.reduce((acc, item) => acc + item.count, 0);

  const handlePurchaseConfirm = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    setCart([]);
    setCartItems([]);
    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: { count: 0 } })
    );
    setModalOpen(false);
  };
  return (
    <div className="cart">
      <h2
        className={`cart__title ${
          cart.length === 0 ? "cart__title--hidden" : ""
        }`}
      >
        장바구니
      </h2>
      {cart.length === 0 && (
        <div className="cart__empty-message">장바구니가 비었습니다.</div>
      )}
      {cart.length > 0 && (
        <div className="cart__items-container">
          {cartItems.map((item) => (
            <div className="cart__item" key={item.id}>
              <div className="cart__item-image">
                <Link to={`/products/${item.id}`}>
                  <img src={item.image} alt={item.title} />
                </Link>
              </div>
              <div className="cart__item-details">
                <Link to={`/products/${item.id}`}>
                  {" "}
                  <div className="cart__item-title">{item.title}</div>
                </Link>
                <div className="cart__item-price">
                  가격 : ${Math.floor(item.price)}
                </div>
                <div className="cart__item-quantity">
                  <button
                    className="cart__quantity-button"
                    onClick={() => handleDecreaseCount(item.id)}
                  >
                    -
                  </button>
                  <span className="cart__quantity">{item.count}</span>
                  <button
                    className="cart__quantity-button"
                    onClick={() => handleIncreaseCount(item.id)}
                  >
                    +
                  </button>
                </div>
                <div className="cart__item-total">
                  상품 총 가격 : ${Math.floor(item.price * item.count)}
                </div>
                <div className="cart__item-remove">
                  <button
                    className="cart__remove-button"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    삭제하기
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart__total">
            총 금액 : $
            {cartItems.reduce(
              (acc, item) => acc + Math.floor(item.price * item.count),
              0
            )}
          </div>
          <button className="cart__buy-button" onClick={handleBuyButtonClick}>
            구매하기
          </button>
        </div>
      )}
      {modalOpen && (
        <div className="cart__modal">
          <div className="cart__modal-content">
            {itemIdToRemove ? (
              <p className="cart__modal-message">정말 삭제하시겠습니까?</p>
            ) : (
              <p className="cart__modal-message">
                총 {numItems}개의 상품을 구매하시겠습니까?
              </p>
            )}
            <div className="cart__modal-buttons">
              {itemIdToRemove ? (
                <>
                  <button
                    className="cart__modal-button cart__modal-button--confirm"
                    onClick={() => handleRemoveConfirmed(itemIdToRemove)}
                  >
                    확인
                  </button>
                  <button
                    className="cart__modal-button cart__modal-button--cancel"
                    onClick={handleModalClose}
                  >
                    취소
                  </button>
                </>
              ) : (
                <div>
                  <Link to="/cart">
                    <button
                      className="cart__modal-button cart__modal-button--confirm"
                      onClick={handlePurchaseConfirm}
                    >
                      확인
                    </button>
                  </Link>
                  <button
                    className="cart__modal-button cart__modal-button--cancel"
                    onClick={handleModalClose}
                  >
                    취소
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;
