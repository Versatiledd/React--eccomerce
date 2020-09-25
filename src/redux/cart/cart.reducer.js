import { removeDuplicate } from "./remove-duplicate-array";

import { addItemToCart, removeItem } from "../cart/cart.utils";

const InitializeState = {
  cartItems: [],
};

const cartReducer = (state = InitializeState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case "CLEAR_ITEMS_FROM_CHECKOUT":
      return {
        ...state,
        cartItems: [],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: removeItem(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
