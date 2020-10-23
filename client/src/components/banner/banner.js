import React from "react";
import "./banner.scss";
import mainBanner from "../images/banner.webp";
import price from "../images/priceOff.webp";

export default function Banner() {
  return (
    <div className="container-banner">
      <div className="wrapper-banner">
        <div className="banner">
          <div className="banner-des">
            <p className="title-banner">Promocja 30%</p>
            <p className="description-banner">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              quasi ea commodi cumque facere! Similique numquam provident
              quibusdam fugit repellat.
            </p>
          </div>
        </div>
        <div className="banner-img">
          <div className="wrapper-img">
            <div className="wrapper-price">
              <img src={price} alt="" className="price-off" />
              <div className="gray"></div>
            </div>
            <img src={mainBanner} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
