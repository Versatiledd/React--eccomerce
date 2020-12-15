import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.API_URL}/create-or-update-user`,
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
    `${process.env.API_URL}/current-user`,
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
    `${process.env.API_URL}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
