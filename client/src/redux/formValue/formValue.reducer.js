const valueFromReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_VALUE_FROM_SINGLE_PRODUCT":
      return {
        valueFrom: action.payload,
      };
    default:
      return state;
  }
};

export default valueFromReducer;
