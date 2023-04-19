import { FaBars, FaMoon, FaShoppingCart, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/NavBar.css";
import ProductSearch from "./ProductSearch";

const Navbar = ({ isDarkMode, handleToggleDarkMode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cartItems.length);
  }, []);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${isDarkMode ? "navbar--dark" : "navbar--light"}`}>
      <div className="navbar__toggle">
        <button className="navbar__toggle-button" onClick={handleClick}>
          <FaBars />
        </button>
      </div>
      <div className="navbar__logo">
        <Link to="/" className="navbar__logo-link">
          <p>Pigjjun Shop</p>
        </Link>
      </div>
      <div className={`navbar__menu ${menuOpen ? "navbar__menu--show" : ""}`}>
        <div className="navbar__menu__item">
          <Link
            to="/categories/clothing"
            className="navbar__menu__link"
            onClick={handleClick}
          >
            Clothing
          </Link>
        </div>
        <div className="navbar__menu__item">
          <Link
            to="/categories/jewelery"
            className="navbar__menu__link"
            onClick={handleClick}
          >
            Jewelery
          </Link>
        </div>
        <div className="navbar__menu__item">
          <Link
            to="/categories/electronics"
            className="navbar__menu__link"
            onClick={handleClick}
          >
            Electronics
          </Link>
        </div>
      </div>
      <div className="navbar__icons">
        <div className="navbar__icon">
          <button
            className="navbar__mode-toggle"
            onClick={handleToggleDarkMode}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <div className="navbar__search">
          <ProductSearch />
        </div>
        <div className="navbar__icon">
          <Link to="/cart" className="navbar__cart">
            <FaShoppingCart />
            <span className="navbar__cart-badge">{cartCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
