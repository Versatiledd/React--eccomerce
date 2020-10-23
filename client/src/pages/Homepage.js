import React from "react";
import { SocialIcon } from "react-social-icons";
import "./homepage.scss";
import MainImg from "../components/images/main-img.webp";

import Banner from "../components/banner/banner";

export default function Homepage() {
  return (
    <>
      <Banner />
      <div className="homepage">
        <div className="homepage-wrapper">
          <div className="one-column">
            <div className="minimal">
              <div className="brush-layer"></div>
              <span className="minimal-text">Minimal style</span>
            </div>
            <div className="bedroom">
              <span className="minimal-text">Bedroom</span>
              <div className="short-info">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eius mod tempor. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit, sed do eius mod tempor. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit, sed do eius mod tempor
              </div>
            </div>
            <div className="wrapper-icons">
              <div className="icons">
                <SocialIcon
                  url="https://pl.linkedin.com/"
                  bgColor="#fff"
                  fgColor="#737276"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
                <SocialIcon
                  url="https://www.facebook.com/"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  bgColor="#fff"
                  fgColor="#737276"
                />
                <SocialIcon
                  url="https://www.instagram.com/?hl=pl"
                  bgColor="#fff"
                  fgColor="#737276"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
                <SocialIcon
                  url="https://twitter.com/?lang=pl"
                  bgColor="#fff"
                  fgColor="#737276"
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
              </div>
              <span className="link">www.decomehome.pl</span>
            </div>
          </div>
          <div className="second-column">
            <div className="img-wrapper">
              <img src={MainImg} alt="" className="main-img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
