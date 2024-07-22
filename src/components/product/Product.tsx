import { NavLink } from 'react-router-dom';
import Button from '../ui-kit/button/Button';
import { IProduct } from '../../types';
import { useAppSelector } from '../../hooks/redux';
import { addProduct, updateProduct } from '../../redux/reducers/cartsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

import './style.css';

interface IProductItem {
  product: IProduct
};

const Product: React.FC<IProductItem> = ({ product }) => {
  const { carts, isLoading } = useAppSelector((state) => state.cartReducer);
  const { title, thumbnail, id, price, quantity, stock } = product;
  const cartId = carts?.[0]?.id;
  const cartProducts = carts?.[0]?.products ?? [];
  const quantityInCart = cartProducts.find((item: IProduct) => item.id === id)?.quantity;
  const quantityProductInCart = quantity ?? quantityInCart;
  const dispatch = useDispatch<AppDispatch>();

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
            <Button
              disabled={isLoading}
              type="button"
              className="product__btn"
              onClick={() => dispatch(updateProduct({ cartId, product, dec: true }))}
            >
              <img src="src/assets/icons/-.svg" alt="- button" />
            </Button>
            <span className="product__quantity">
              {quantityProductInCart} {`${quantityProductInCart > 1 ? 'items' : 'item'}`}
            </span>
            <Button
              disabled={isLoading || quantityProductInCart === stock}
              type="button"
              className="product__btn"
              onClick={() => dispatch(updateProduct({ cartId, product }))}
            >
              <img src="src/assets/icons/+.svg" alt="+ button" />
            </Button>
          </div>
        ) : (
            <Button
              disabled={isLoading}
              type="button"
              className="btn product__btn"
              onClick={() => dispatch(addProduct({ cartId, product }))}
            >
              <img src="src/assets/icons/cart.svg" alt="Add to cart button" />
            </Button>
          )}
      </div>
    </li>
  );
};

export default Product;
