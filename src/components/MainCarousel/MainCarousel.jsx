import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../styles/MainCarousel.css";
import { Link } from "react-router-dom";

const MainCarousel = () => {
  return (
    <div className="container">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        showIndicators={true}
        interval={3000}
        swipeable={true}
        dynamicHeight={false}
      >
        <div>
          <img src="/clothing.png" alt="clothing" />
          <div className="legend">
            <h2>다양한 청바지</h2>
            <p>찢어진 청바지 물빠진 청바지를 둘러보세요!</p>
            <Link to="/categories/clothing">
              <button className="link-button">바로가기</button>
            </Link>
          </div>
        </div>
        <div>
          <img src="/electronics.jpg" alt="electronics" />
          <div className="legend">
            <h2>선명한 모니터</h2>
            <p>내 업무환경을 좀 더 효율적으로!</p>
            <Link to="/categories/electronics">
              <button className="link-button">바로가기</button>
            </Link>
          </div>
        </div>
        <div>
          <img src="/grocery.jpg" alt="grocery" />
          <div className="legend">
            <h2>새벽 배송</h2>
            <p>신선한 식재료를 다음 날 바로 문 앞에!</p>
            <Link to="/categories/grocery">
              <button className="link-button">바로가기</button>
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default MainCarousel;
