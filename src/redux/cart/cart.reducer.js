import { removeDuplicate } from "./remove-duplicate-array";

const InitializeState = {
  hidden: true,
  cartItems: []
};

const cartReducer = (state = InitializeState, action) => {
  switch (action.type) {
    case "TOGGLE_CART_HIDDEN":
      return {
        ...state,
        hidden: !state.hidden
      };
    case "ADD_ITEM":
      return {
        ...state,
        cartItems: removeDuplicate(state.cartItems, action.payload)
      };
    default:
      return state;
  }
};

export default cartReducer;
