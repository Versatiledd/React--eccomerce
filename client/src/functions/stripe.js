import axios from "axios";

export const createAddress = async (authToken, address) =>
  await axios.post(
    "https://shop-md.herokuapp.com/api/create-adress",
    { address },
    {
      headers: { "Access-Control-Allow-Origin": true, authToken },
    }
  );

export const createPayment = async (authToken, token) =>
  await axios.post(
    "https://shop-md.herokuapp.com/api/create-payment",
    { token },
    {
      headers: { "Access-Control-Allow-Origin": true, authToken },
    }
  );
