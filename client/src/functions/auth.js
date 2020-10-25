import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    process.env.REACT_APP_API,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getCurrentUser = async (authtoken) => {
  return await axios.post(
    "http://localhost:5000/api/current-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
