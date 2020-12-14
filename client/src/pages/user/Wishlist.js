import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getWishlist, removeWishlist } from "../../functions/User";
import WishListProduct from "./WishListProduct";
import UserNav from "../../components/nav/UserNav";
import "./history.scss";

const Wishlist = () => {
  const [wishList, setWishlist] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  console.log(wishList);

  const loadWishList = () => {
    getWishlist(currentUser.token).then((res) =>
      setWishlist(res.data.wishlist)
    );
  };

  useEffect(() => {
    loadWishList();
  }, []);

  return (
    <div className="main-container">
      <UserNav />
      <div
        style={{
          minWidth: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            // justifyContent: "space-between",
            width: "1000px",
            marginLeft: "30px",
          }}
        >
          {wishList.length === 0 ? (
            <p
              style={{
                fontWeight: 600,
                fontSize: "22px",
                margin: "10px",
                textAlign: "center",
                width: "100%",
              }}
            >
              Brak produktów na liście życzeń.
            </p>
          ) : (
            wishList.map((el, i) => (
              <WishListProduct product={wishList} i={i} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
