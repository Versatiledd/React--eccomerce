const InitializeState = {
  hidden: true
};

const cartReducer = (state = InitializeState, action) => {
  switch (action.type) {
    case "TOGGLE_CART_HIDDEN":
      return {
        ...state,
        hidden: !state.hidden
      };
    default:
      return state;
  }
};

export default cartReducer;
