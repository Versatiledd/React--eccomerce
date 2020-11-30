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

export const getTotalProducts = async () =>
  await axios.get(`http://localhost:5000/api/products/total`, {
    headers: { "Access-Control-Allow-Origin": true },
  });

// zapytanie do api z uwzględnieniem paginacji

export const getProductsWithPagination = async (sort, order, page) =>
  await axios.post(
    `http://localhost:5000/api/products`,
    {
      sort,
      order,
      page,
    },
    {
      headers: { "Access-Control-Allow-Origin": true },
    }
  );

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `http://localhost:5000/api/product/star/${productId}`,
    { star },
    {
      headers: { "Access-Control-Allow-Origin": true, authtoken },
    }
  );

// related products based on single product

export const getRelatedProducts = async (productId) =>
  await axios.get(`http://localhost:5000/api/product/related/${productId}`, {
    headers: { "Access-Control-Allow-Origin": true },
  });

export const fetchProductsByFilter = async (query) =>
  await axios.post("http://localhost:5000/api/search/filters", query, {
    headers: { "Access-Control-Allow-Origin": true },
  });
