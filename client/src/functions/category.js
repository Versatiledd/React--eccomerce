import axios from "axios";

export const getCategories = async () =>
  await axios.get(`${process.env.API_URL}/categories`);

export const getCategory = async (slug) =>
  await axios.get(`${process.env.API_URL}/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.API_URL}/category/${slug}`, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${process.env.API_URL}/category/${slug}`, category, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const createCategory = async (name, authtoken) =>
  await axios.post(`${process.env.API_URL}/category`, name, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const getCategorySubs = async (id) =>
  await axios.get(`${process.env.API_URL}/category/subs/${id}`);
