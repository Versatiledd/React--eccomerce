const toggleCartHidden = () => ({
  type: "TOGGLE_CART_HIDDEN"
});

export default toggleCartHidden;

export const addItem = item => ({
  type: "ADD_ITEM",
  payload: item
});
