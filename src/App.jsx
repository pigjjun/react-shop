import React, { useState, useEffect } from "react";
import Navbar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Clothing from "./Pages/Clothing";
import Jewelery from "./Pages/Jewelery";
import Electronics from "./Pages/Electronics";
import Cart from "./Pages/Cart";
import "./App.css";
import ProductDetail from "./components/Product/ProductDetail";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import NotFoundPage from "./Pages/NotFoundPage";
import Footer from "./components/Footer/Footer";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    transition: background-color 0.5s ease-out, color 0.5s ease-out;
  }
`;

const lightTheme = {
  background: "#ffffff",
  color: "#000000",
};

const darkTheme = {
  background: "#262626",
  color: "#ffffff",
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode") === "true"
  );

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <GlobalStyle />
        <Navbar
          isDarkMode={isDarkMode}
          handleToggleDarkMode={handleToggleDarkMode}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="categories/clothing" element={<Clothing />} />
          <Route path="categories/jewelery" element={<Jewelery />} />
          <Route path="categories/electronics" element={<Electronics />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="categories/grocery" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
