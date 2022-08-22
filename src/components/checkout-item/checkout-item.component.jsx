import './checkout-item.styles.scss';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToCartAction,
  clearItemFromCartAction,
  removeItemFromCartAction,
} from '../../store/cart/cart.action';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const clearItemFromCartHandler = () =>
    dispatch(clearItemFromCartAction(cartItems, cartItem));

  const addItemToCartHandler = () =>
    dispatch(addItemToCartAction(cartItems, cartItem));

  const removeItemFromCartHandler = () =>
    dispatch(removeItemFromCartAction(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemFromCartHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={clearItemFromCartHandler}>
        &#10005;
      </span>
    </div>
  );
};
export default CheckoutItem;
