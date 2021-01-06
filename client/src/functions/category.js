import axios from "axios";

export const getCategories = async () =>
  await axios.get(`https://shop-md.herokuapp.com/api/categories`);

export const getCategory = async (slug) =>
  await axios.get(`https://shop-md.herokuapp.com/api/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`https://shop-md.herokuapp.com/api/category/${slug}`, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(
    `https://shop-md.herokuapp.com/api/category/${slug}`,
    category,
    {
      headers: { "Access-Control-Allow-Origin": true, authtoken },
    }
  );

export const createCategory = async (name, authtoken) =>
  await axios.post(`https://shop-md.herokuapp.com/api/category`, name, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const getCategorySubs = async (id) =>
  await axios.get(`https://shop-md.herokuapp.com/api/category/subs/${id}`);
