export const addItem = (item) => ({
  type: "ADD_ITEM",
  payload: item,
});

export const clearItemsFromCheckout = (item) => ({
  type: "CLEAR_ITEMS_FROM_CHECKOUT",
  payload: item,
});

export const removeItem = (item) => ({
  type: "REMOVE_ITEM",
  payload: item,
});
