import { NavLink } from 'react-router-dom';
import Button from '../ui-kit/button/Button';
import { IProduct } from '../../types';

import './style.css';

const Product: React.FC<IProduct> = ({ title, thumbnail, id, price, quantity }) => (
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
      {quantity ? (
        <div className="product__control">
          <Button type="button" className="product__btn">
            <img src="src/assets/icons/-.svg" alt="- button" /></Button>
          <span className="product__quantity">{quantity} item</span>
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

export default Product;
