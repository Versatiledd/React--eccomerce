import axios from "axios";

export const getCategories = async () =>
  await axios.get("http://localhost:5000/api/categories");

export const getCategory = async (slug) =>
  await axios.get(`http://localhost:5000/api/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`http://localhost:5000/api/category/${slug}`, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`http://localhost:5000/api/category/${slug}`, category, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const createCategory = async (name, authtoken) =>
  await axios.post(`http://localhost:5000/api/category`, name, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const getCategorySubs = async (id) =>
  await axios.get(`http://localhost:5000/api/category/subs/${id}`);
