const setCurrentUser = (user) => ({
  type: "SET_CURRENT_USER",
  payload: user,
});

export default setCurrentUser;

export const logoutCurrentUser = (user) => ({
  type: "LOGOUT_CURRENT_USER",
  payload: user,
});
