import axios from "axios";

export const createAddress = async (authToken, address) =>
  await axios.post(
    "http://localhost:5000/api/create-adress",
    { address },
    {
      headers: { "Access-Control-Allow-Origin": true, authToken },
    }
  );

export const createPayment = async (authToken, token) =>
  await axios.post(
    "http://localhost:5000/api/create-payment",
    { token },
    {
      headers: { "Access-Control-Allow-Origin": true, authToken },
    }
  );
