import { NavLink } from 'react-router-dom';
import Button from '../ui-kit/button/Button';
import { IProduct } from '../../types';
import { useAppSelector } from '../../hooks/redux';

import './style.css';

const Product: React.FC<IProduct> = ({ title, thumbnail, id, price, quantity }) => {
  const { carts } = useAppSelector((state) => state.cartReducer);
  const cartProducts = carts?.carts?.[0]?.products ?? [];
  const quantityInCart = cartProducts.find((item: IProduct) => item.id === id)?.quantity;
  const quantityProductInCart = quantity ?? quantityInCart;

  return (
    <li className="product">
      <figure className="product__img">
        <NavLink to={`/product/${id}`}>
          <img src={thumbnail} alt={title} />
          <p className="product__img-overlay">Show details</p>
        </NavLink>
      </figure>
      <div className="product__content">
        <NavLink to={`/product/${id}`} className="product__title">
          <h4 className="product__text">{title}</h4>
          <p className="product__price">{price} $</p>
        </NavLink>
        {quantityProductInCart ? (
          <div className="product__control">
            <Button type="button" className="product__btn">
              <img src="src/assets/icons/-.svg" alt="- button" /></Button>
            <span className="product__quantity">
              {quantityProductInCart} {`${quantityProductInCart > 1 ? 'items' : 'item'}`}
            </span>
            <Button type="button" className="product__btn">
              <img src="src/assets/icons/+.svg" alt="+ button" />
            </Button>
          </div>
        ) : (
            <button type="button" className="btn product__btn">
              <img src="src/assets/icons/cart.svg" alt="Add to cart button" />
            </button>
          )}
      </div>
    </li>
  );
};

export default Product;
