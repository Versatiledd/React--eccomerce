export const removeDuplicate = (cartItems, cartItemToAdd) => {
  const currentCart = cartItems.find(item => item.id === cartItemToAdd.id);

  if (currentCart) {
    return cartItems.map(item =>
      item.id === cartItemToAdd.id ? { ...item, number: item.number + 1 } : {}
    );
  }

  return [...cartItems, { ...cartItemToAdd, number: 1 }];
};
