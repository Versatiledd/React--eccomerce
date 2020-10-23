const INITIAL_STATE = {
  isOpen: false,
};

const menuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      return {
        ...state,
        isOpen: action.openNav,
      };
    default:
      return state;
  }
};

export default menuReducer;
