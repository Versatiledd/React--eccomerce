import axios from "axios";

export const userCart = async (cart, authtoken, tokenStripe) =>
  await axios.post(
    "https://shop-md.herokuapp.com/api/user/cart",
    { cart, tokenStripe },
    {
      headers: { "Access-Control-Allow-Origin": true, authtoken },
    }
  );

export const getUserProducts = async (authtoken) =>
  await axios.get("https://shop-md.herokuapp.com/api/user/products", {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    "https://shop-md.herokuapp.com/api/user/wishlist",
    { productId },
    {
      headers: { "Access-Control-Allow-Origin": true, authtoken },
    }
  );

export const getWishlist = async (authtoken) =>
  await axios.get("https://shop-md.herokuapp.com/api/user/wishlist", {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `https://shop-md.herokuapp.com/api/user/wishlist/${productId}`,
    {},
    {
      headers: { "Access-Control-Allow-Origin": true, authtoken },
    }
  );
