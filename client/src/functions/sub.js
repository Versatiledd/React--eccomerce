import axios from "axios";

export const getSubs = async () =>
  await axios.get("http://localhost:5000/api/subs");

export const getSubCategory = async (slug) =>
  await axios.get(`http://localhost:5000/api/sub/${slug}`);

export const removeSubCategory = async (slug, authtoken) =>
  await axios.delete(`http://localhost:5000/api/sub/${slug}`, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const updateSubCategory = async (slug, name, authtoken) =>
  await axios.put(`http://localhost:5000/api/sub/${slug}`, name, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const createSubCategory = async (name, authtoken) =>
  await axios.post(`http://localhost:5000/api/sub`, name, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });
