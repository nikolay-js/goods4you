import { NavLink } from 'react-router-dom';
import Button from '../ui-kit/button/Button';
import { IProduct } from '../../types';

import './style.css';

const CartItem: React.FC<IProduct> = ({ title, thumbnail, id, price, quantity }) => (
  <li className="cart-item">
    <figure className="cart-item__content">
      <img src={thumbnail} alt={title} />
      <figcaption className="cart-item__img-caption">
        <NavLink to={`/product/${id}`} className="cart-item__title">
          <h4 className="cart-item__text">{title}</h4>
          <p className="cart-item__price">{price} $</p>
        </NavLink>
      </figcaption>
    </figure>
    {quantity ? (
      <div className="cart-item__control">
        <div className="cart-item__added-control">
          <Button type="button" className="cart-item__btn">
            <img src="src/assets/icons/-.svg" alt="- button" />
          </Button>
          <div className="cart-item__quantity">{quantity} {`${quantity>1 ? 'items' : 'item'}`}</div>
          <Button type="button" className="cart-item__btn">
            <img src="src/assets/icons/+.svg" alt="+ button" />
          </Button>
        </div>
        <a className="cart-item__delete-btn" area-lable="Delete button">Delete</a>
      </div>
    ) : (
        <button type="button" className="btn cart-item__btn cart-item__cart-btn">
          <img src="src/assets/icons/cart.svg" alt="Add to cart button" />
        </button>
      )}
  </li>
);

export default CartItem;
