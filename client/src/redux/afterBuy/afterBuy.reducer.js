const InitializeState = {
  cartItems: [],
};

const afterBuyReducer = (state = InitializeState, action) => {
  switch (action.type) {
    case "GET_ITEMS_AFTER_BUYING":
      return {
        ...state,
        cartItems: [state.cartItems, ...action.payload],
      };
    default:
      return state;
  }
};

export default afterBuyReducer;
