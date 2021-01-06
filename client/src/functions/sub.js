import axios from "axios";

export const getSubs = async () =>
  await axios.get("https://shop-md.herokuapp.com/api/subs");

export const getSubCategory = async (slug) =>
  await axios.get(`https://shop-md.herokuapp.com/api/sub/${slug}`);

export const removeSubCategory = async (slug, authtoken) =>
  await axios.delete(`https://shop-md.herokuapp.com/api/sub/${slug}`, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const updateSubCategory = async (slug, name, authtoken) =>
  await axios.put(`https://shop-md.herokuapp.com/api/sub/${slug}`, name, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });

export const createSubCategory = async (name, authtoken) =>
  await axios.post(`https://shop-md.herokuapp.com/api/sub`, name, {
    headers: { "Access-Control-Allow-Origin": true, authtoken },
  });
