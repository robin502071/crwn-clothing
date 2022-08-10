import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart } =
    useContext(CartContext);
  return (
    <div>
      <h1>I am the Checkout page</h1>
      {cartItems.map((cartItem) => {
        const { id, name, quantity } = cartItem;
        return (
          <div key={id}>
            <h2>{name}</h2>
            <span>{quantity}</span>
            <br />
            <span onClick={() => removeItemFromCart(cartItem)}>decrement</span>
            <br />
            <span onClick={() => addItemToCart(cartItem)}>increment</span>
          </div>
        );
      })}
    </div>
  );
};

export default Checkout;
