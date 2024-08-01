import { NavLink } from 'react-router-dom';
import Button from '../ui-kit/button/Button';
import ProductControl from '../product-control/ProductControl';
import { IProduct } from '../../types';
import { useAppSelector } from '../../hooks/redux';
import { addProduct } from '../../redux/reducers/cartsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

import './style.css';

interface IProductItem {
  product: IProduct
};

const Product: React.FC<IProductItem> = ({ product }) => {
  const { carts, isLoading } = useAppSelector((state) => state.cartReducer);
  const { title, thumbnail, id, price } = product;
  const cartId = carts?.[0]?.id;
  const cartProducts = carts?.[0]?.products ?? [];
  const quantityProductInCart = cartProducts.find((item: IProduct) => item.id === id)?.quantity;
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
          <ProductControl
            product={product}
            isLoading={isLoading}
            cartId={cartId}
            quantityProductInCart={quantityProductInCart}
          />
        ) : (
            <Button
              aria-label="Add to cart"
              disabled={isLoading}
              type="button"
              className="btn product__btn"
              onClick={() => dispatch(addProduct({ cartId, productId: id }))}
            >
              <img src="src/assets/icons/cart.svg" alt="Add to cart button" />
            </Button>
          )}
      </div>
    </li>
  );
};

export default Product;
