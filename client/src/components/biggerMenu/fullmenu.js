import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { dataMenu } from "./dataMenu";
import "./fullmenu.scss";

const Fullmenu = () => {
  const [openMenu, toggleMenu] = useState({
    on: false,
    text: null,
  });

  useEffect(() => {}, [openMenu]);

  return (
    <>
      <div className="wrapper-nav">
        <div className="nav">
          <nav className="container-menu">
            <ul className="bigger-menu">
              {dataMenu.map((el) => {
                const { id, text, path, icon, title, description, price } = el;
                const { one, two, three, four } = el.links;
                return (
                  <>
                    <li
                      key={id}
                      className="single"
                      onMouseEnter={() =>
                        toggleMenu({
                          on: true,
                          text: text,
                        })
                      }
                      onMouseLeave={() =>
                        toggleMenu({
                          on: false,
                          text: null,
                        })
                      }
                    >
                      <Link to={path}>
                        <div className="wrapper-icon">
                          <div className="icon">{icon}</div>
                          <div>{text}</div>
                        </div>
                      </Link>
                      <motion.div
                        style={{
                          left: openMenu.text === "Wystrój" ? -400 : 0,
                        }}
                        animate={{ opacity: openMenu.on ? 1 : 0 }}
                        transition={{
                          duration: openMenu.on && 0.4,
                        }}
                        className={
                          openMenu.on && text === openMenu.text
                            ? "hover-wrapper"
                            : "off"
                        }
                      >
                        <div className="container-flex">
                          <div className="furniture">
                            <ul
                              style={{
                                padding: 0,
                              }}
                              className="furniture-links"
                            >
                              <li>
                                <Link to={`${one}`}>{el.items.one}</Link>
                              </li>
                              <li>
                                <Link to={`${two}`}>{el.items.two}</Link>
                              </li>
                              <li>
                                <Link to={`${three}`}>{el.items.three}</Link>
                              </li>
                              <li>
                                <Link to={`${four}`}>{el.items.four}</Link>
                              </li>
                            </ul>
                          </div>
                          <div className="description">
                            <div className="wrapper-des">
                              <p className="title">{title}</p>
                              <p className="des">{description}</p>
                              <span className="price">{price}</span>
                            </div>
                          </div>
                          <div className="img-wrapper">
                            <div className="single-img">
                              <img
                                src={el.image}
                                alt=""
                                className="img-chair"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </li>
                  </>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Fullmenu;
