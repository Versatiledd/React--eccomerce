let initializeState = [];

if (typeof window !== "undefined") {
  if (localStorage.getItem("cart")) {
    initializeState = JSON.parse(localStorage.getItem("cart"));
  } else {
    initializeState = [];
  }
}

const cartReducer = (state = initializeState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    case "UPDATE_COUNT_ITEM":
      return action.payload;
    case "REMOVE_FROM_CART":
      return action.payload;
    case "CLEAR_CART_FROM_CHECKOUT":
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
