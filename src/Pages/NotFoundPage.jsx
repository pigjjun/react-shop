import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFoundPage.css";
const NotFoundPage = () => {
  return (
    <div className="not-found-page-container">
      <h1>404 Error</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to="/">
        <button className="main-button">메인으로</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
