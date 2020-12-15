import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`https://shop-md.herokuapp.com/api/product`, product, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const getProducts = async (count) =>
  await axios.get(`https://shop-md.herokuapp.com/api/products/${count}`, {
    headers: { "Access-Control-Allow-Origin": true },
  });

export const deleteProduct = async (slug, authtoken) =>
  await axios.delete(`https://shop-md.herokuapp.com/api/product/${slug}`, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const getProduct = async (slug) =>
  await axios.get(`https://shop-md.herokuapp.com/api/product/${slug}`, {
    headers: { "Access-Control-Allow-Origin": true },
  });

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(
    `https://shop-md.herokuapp.com/api/product/${slug}`,
    product,
    {
      headers: { "Access-Control-Allow-Origin": true, authtoken },
    }
  );

export const getTotalProducts = async () =>
  await axios.get(`https://shop-md.herokuapp.com/api/products/total`, {
    headers: { "Access-Control-Allow-Origin": true },
  });

// zapytanie do api z uwzględnieniem paginacji

export const getProductsWithPagination = async (sort, order, page) =>
  await axios.post(
    `https://shop-md.herokuapp.com/api/products`,
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
    `https://shop-md.herokuapp.com/api/product/star/${productId}`,
    { star },
    {
      headers: { "Access-Control-Allow-Origin": true, authtoken },
    }
  );

// related products based on single product

export const getRelatedProducts = async (productId) =>
  await axios.get(
    `https://shop-md.herokuapp.com/api/product/related/${productId}`,
    {
      headers: { "Access-Control-Allow-Origin": true },
    }
  );

export const fetchProductsByFilter = async (query) =>
  await axios.post("https://shop-md.herokuapp.com/api/search/filters", query, {
    headers: { "Access-Control-Allow-Origin": true },
  });
