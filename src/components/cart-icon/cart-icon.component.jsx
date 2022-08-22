import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsCartOpen,
  selectCartCount,
} from '../../store/cart/cart.selector';
import { setIsCartOpenAction } from '../../store/cart/cart.action';

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);
  const toggleIsCartOpen = () => dispatch(setIsCartOpenAction(!isCartOpen));
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount className="item-count">{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
