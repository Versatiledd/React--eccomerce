import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`http://localhost:5000/api/product`, product, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const getProducts = async (count) =>
  await axios.get(`http://localhost:5000/api/products/${count}`, {
    headers: { "Access-Control-Allow-Origin": true },
  });

export const deleteProduct = async (slug, authtoken) =>
  await axios.delete(`http://localhost:5000/api/product/${slug}`, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const getProduct = async (slug) =>
  await axios.get(`http://localhost:5000/api/product/${slug}`, {
    headers: { "Access-Control-Allow-Origin": true },
  });

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`http://localhost:5000/api/product/${slug}`, product, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });
