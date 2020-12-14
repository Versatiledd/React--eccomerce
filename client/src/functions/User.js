import axios from "axios";

export const userCart = async (cart, authtoken, tokenStripe) =>
  await axios.post(
    "http://localhost:5000/api/user/cart",
    { cart, tokenStripe },
    {
      headers: { "Access-Control-Allow-Origin": true, authtoken },
    }
  );

export const getUserProducts = async (authtoken) =>
  await axios.get("http://localhost:5000/api/user/products", {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    "http://localhost:5000/api/user/wishlist",
    { productId },
    {
      headers: { "Access-Control-Allow-Origin": true, authtoken },
    }
  );

export const getWishlist = async (authtoken) =>
  await axios.get("http://localhost:5000/api/user/wishlist", {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `http://localhost:5000/api/user/wishlist/${productId}`,
    {},
    {
      headers: { "Access-Control-Allow-Origin": true, authtoken },
    }
  );
