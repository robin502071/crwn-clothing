import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';
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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error(`Unhadled typed of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  // useEffect(() => {
  //   const newCartCounts = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   );
  //   setCartCount(newCartCounts);
  // }, [cartItems]);

  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity * cartItem.price,
  //     0
  //   );
  //   setCartTotal(newCartTotal);
  // }, [cartItems]);

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, cartCount, cartTotal, isCartOpen } = state;
  const updateCartItemsForReducer = (newCartItems) => {
    const newCartCounts = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCounts,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addItemToCartHelper(cartItems, productToAdd);
    updateCartItemsForReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeItemFromCartHelper(cartItems, productToRemove);
    updateCartItemsForReducer(newCartItems);
  };

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearItemFromCartHelper(cartItems, productToClear);
    updateCartItemsForReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
