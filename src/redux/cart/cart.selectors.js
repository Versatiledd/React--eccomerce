import { createSelector } from "reselect";

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const cartHidden = createSelector([selectCart], cart => cart.hidden);

export const changeNumberInShop = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((acc, cartItem) => acc + cartItem.number, 0)
);
