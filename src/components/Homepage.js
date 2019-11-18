import React from "react";
import homeContainer from "../sass/homeContainer.scss";

export default function Homepage() {
  return (
    <>
      <div className="homepage-container">
        <div className="main-menu">
          <div className="menu-item">
            <div className="content">
              <h2 className="title">Czapki</h2>
              <span className="subtitle">Kup teraz</span>
            </div>
          </div>
        </div>
      </div>
      <div className="homepage-container">
        <div className="main-menu">
          <div className="menu-item">
            <div className="content">
              <h2 className="title">Płaszcze</h2>
              <span className="subtitle">Kup teraz</span>
            </div>
          </div>
        </div>
      </div>
      <div className="homepage-container">
        <div className="main-menu">
          <div className="menu-item">
            <div className="content">
              <h2 className="title">Buty</h2>
              <span className="subtitle">Kup teraz</span>
            </div>
          </div>
        </div>
      </div>
      <div className="homepage-container">
        <div className="main-menu">
          <div className="menu-item">
            <div className="content">
              <h2 className="title">Ubrania</h2>
              <span className="subtitle">Kup teraz</span>
            </div>
          </div>
        </div>
      </div>
      <div className="homepage-container">
        <div className="main-menu">
          <div className="menu-item">
            <div className="content">
              <h2 className="title">Dla biednych</h2>
              <span className="subtitle">Kup teraz</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
