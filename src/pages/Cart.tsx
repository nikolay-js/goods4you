import CartItem from "../components/cart-item/CartItem";
import { IProduct } from "../types";

interface ICartProps {
  cart: {
    products: Array<IProduct>,
    totalQuantity: number,
    discountedTotal: number,
    total: number,
  },
};

const Cart: React.FC<ICartProps> = ({ cart }) => {
  const { products, totalQuantity, discountedTotal, total } = cart;
  
  return (
    <main className="section">
      <div className="container">
        <div className="cart-page">
          <h2 className="title-1">My cart</h2>
          <div className="cart-page__content">
            <ul className="cart-page__items">
              {products.map((cartItem, id) => {
                return (
                  <CartItem
                    key={id}
                    title={cartItem.title}
                    thumbnail={cartItem.thumbnail}
                    price={cartItem.price}
                    quantity={cartItem.quantity}
                    id={cartItem.id}
                  />
                );
              })}
            </ul>
            <div className="cart-page__total">
              <div className="total__common">
                <div className="total__common-item">
                  <div className="common-item__count">Total count</div>
                  <div className="common-item__count-value">{totalQuantity} items</div>
                </div>
                <div className="total__common-item">
                  <div className="common-item__price">Price without discount</div>
                  <div className="common-item__price-value">{total}$</div>
                </div>
              </div>
              <div className="total__item">
                <div className="total__item-price">Total price</div>
                <div className="total__item-value">{discountedTotal}$</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;