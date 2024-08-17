import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../ui-kit/button/Button';
import ProductControl from '../product-control/ProductControl';
import { IProduct } from '../../types';
import { AppDispatch } from '../../redux/store';
import { deleteProduct, addProduct } from '../../redux/reducers/cartsSlice';

import './style.css';

interface ICartItem {
  product: IProduct,
  cartId: number,
  isLoading: boolean,
};

const CartItem: React.FC<ICartItem> = ({ product, cartId, isLoading }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { title, thumbnail, id, price, quantity, discountPercentage = 0 } = product;
  const discountValue = (price - (price * discountPercentage / 100)).toFixed(2);

  return (
    <li className="cart-item">
      <figure className="cart-item__content">
        <img src={thumbnail} alt={title} />
        <figcaption className="cart-item__img-caption">
          <NavLink to={`/product/${id}`} className="cart-item__title">
            <h4 className="cart-item__text">{title}</h4>
            <p className="cart-item__price">{discountValue} $</p>
          </NavLink>
        </figcaption>
      </figure>
      {quantity ? (
        <div className="cart-item__control">
          <ProductControl
            product={product}
            isLoading={isLoading}
            cartId={cartId}
            quantityProductInCart={quantity}
          />
          <a area-lable="Delete button" className={`cart-item__delete-btn${isLoading ? '--disabled' : ''}`} onClick={() => dispatch(deleteProduct({ cartId, productId: id }))}>Delete</a>
        </div>
      ) : (
          <Button
            aria-label="Add to cart"
            type="button"
            className="btn cart-item__btn cart-item__cart-btn"
            disabled={isLoading}
            onClick={() => dispatch(addProduct({ cartId, productId: id }))}
          >
            <img src="./images/icons/cart.svg" alt="Add to cart button" />
          </Button>
        )}
    </li>
  )
};

export default CartItem;
