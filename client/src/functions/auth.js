import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    "http://localhost:5000/api/create-or-update-user",
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

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    "http://localhost:5000/api/current-admin",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
