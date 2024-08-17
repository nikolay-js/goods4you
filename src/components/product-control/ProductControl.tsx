import { useDispatch } from "react-redux";
import Button from "../ui-kit/button/Button";
import { IProduct } from "../../types";
import { AppDispatch } from "../../redux/store";
import { updateProduct } from "../../redux/reducers/cartsSlice";

import './style.css';

interface IProductControl {
  product: IProduct,
  isLoading: boolean,
  cartId: number,
  quantityProductInCart: number,
};

const ProductControl: React.FC<IProductControl> = ({ product, isLoading, cartId, quantityProductInCart }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id: productId, stock } = product;

  return (
    <div className="product-control">
      <Button
        aria-label="Decrease in cart"
        disabled={isLoading}
        type="button"
        className="product-control__btn"
        onClick={() => dispatch(updateProduct({ cartId, productId, dec: true }))}
      >
        <img src="src/assets/icons/-.svg" alt="- button" />
      </Button>
      <span className="product-control__quantity">
        {quantityProductInCart} {`${quantityProductInCart > 1 ? 'items' : 'item'}`}
      </span>
      <Button
        aria-label="Increase in cart"
        disabled={isLoading || quantityProductInCart === stock}
        type="button"
        className="product-control__btn"
        onClick={() => dispatch(updateProduct({ cartId, productId }))}
      >
        <img src="src/assets/icons/+.svg" alt="+ button" />
      </Button>
    </div>
  );
};

export default ProductControl;
