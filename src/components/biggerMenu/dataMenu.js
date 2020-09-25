import React from "react";
import { AiFillDatabase, AiFillBulb, AiFillBoxPlot } from "react-icons/ai";
import { BiBuildingHouse } from "react-icons/bi";
import Chair from "../images/chair.webp";
import Lighting from "../images/lighting.webp";

export const dataMenu = [
  {
    id: 0,
    path: "/shop/meble",
    icon: <AiFillDatabase />,
    text: "Meble",
    links: {
      one: "/shop/szafy",
      two: "/shop/biurka",
      three: "/shop/fotele",
      four: "/shop/komody",
    },
    items: {
      one: "Szafy",
      two: "Biurka",
      three: "Fotele",
      four: "Komody",
    },
    title: "Krzesło X200",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, totam? Corrupti, officia reprehenderit iste eaque quas comodi",
    price: "930 zł",
    image: Chair,
  },
  {
    id: 1,
    path: "/shop/regały",
    icon: <AiFillBoxPlot />,
    text: "Regały",
    links: {
      one: "/shop/regały-pokojowe",
      two: "/shop/regały-industrialne",
      three: "/shop/regały-przemysłowe",
    },
    items: {
      one: "Regały pokojowe",
      two: "Regały industrialne",
      three: "Regały przemysłowe",
    },
    title: "Krzesło X200",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, totam? Corrupti, officia reprehenderit iste eaque quas comodi",
    price: "930 zł",
    image: Chair,
  },
  {
    id: 2,
    path: "/shop/oświetlenie",
    icon: <AiFillBulb />,
    text: "Oświetlenie",
    links: {
      one: "/shop/lampy-wiszące",
      two: "/shop/lampy-sufitowe",
      three: "/shop/lampy-podłogowe",
      four: "/shop/lampy-stojące",
    },
    items: {
      one: "Lampy wiszące",
      two: "Lampy sufitowe",
      three: "Lampy podłogowe",
      four: "Lampy stojące",
    },
    title: "Krzesło X200",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, totam? Corrupti, officia reprehenderit iste eaque quas comodi",
    price: "930 zł",
    image: Lighting,
  },
  {
    id: 3,
    path: "/shop/wystrój",
    icon: <BiBuildingHouse />,
    text: "Wystrój",
    links: {
      one: "/shop/lampiony",
      two: "/shop/świeczki",
      three: "/shop/zegary",
      four: "/shop/obrazy",
    },
    items: {
      one: "Lampiony",
      two: "Świeczki",
      three: "Zegary",
      four: "Obrazy",
    },
    title: "Krzesło X200",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, totam? Corrupti, officia reprehenderit iste eaque quas comodi",
    price: "930 zł",
    image: Chair,
  },
];
