import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCartOpen: false,
  cartItems: [],
};

const addItemToCartHelper = (cartItems, productToAdd) => {
  // 在 cartItems 找找看要加入的商品是否在陣列中
  const foundItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // 若找到該 item quantity + 1，其餘 item 不變 (直接 return)
  if (foundItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // 沒找到就新增 => 複製原 cartItems 再合併 productToAdd 跟新增 quantity 屬性 & 值為 1
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
const removeItemFromCartHelper = (cartItems, productToRemove) => {
  // 找到要移除的 product
  const foundItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  // foundItem quantity 等於 1 的話就要整個從 cartItems 陣列中刪除
  if (foundItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
  // foundItem quantity 不等於 1 該 item quantity - 1，其餘 item 不變 (直接 return)
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
const clearItemFromCartHelper = (cartItems, productToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, { payload }) => {
      state.cartItems = payload;
    },
    setIsCartOpen: (state, { payload }) => {
      state.isCartOpen = payload;
    },

    addItemToCart: (state, { payload }) => {
      const { cartItems, productToAdd } = payload;
      state.cartItems = addItemToCartHelper(cartItems, productToAdd);
    },
    removeItemFromCart: (state, { payload }) => {
      const { cartItems, productToRemove } = payload;
      state.cartItems = removeItemFromCartHelper(cartItems, productToRemove);
    },
    clearItemFromCart: (state, { payload }) => {
      const { cartItems, productToClear } = payload;
      state.cartItems = clearItemFromCartHelper(cartItems, productToClear);
    },
  },
});

export const {
  setCartItems,
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
