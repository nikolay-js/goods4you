import CartItem from "../components/cart-item/CartItem";
import { IProduct } from "../types";
import { useAppSelector } from "../hooks/redux";

const Cart: React.FC = () => {
  const { carts, isLoading } = useAppSelector((state) => state.cartReducer);
  const cart = carts?.[0] ?? [];
  const { products = [], totalProducts, discountedTotal, total, id: cartId } = cart;

  return (
    <main className="section">
      <div className="container">
        <div className="cart-page">
          <h2 className="title-1">My cart</h2>
          {cart.length === 0 ? (
            <p>is loading...</p>
          ) : (
              <div className="cart-page__content">
                <ul className="cart-page__items">
                  {products.map((cartItem: IProduct, id: number) => {
                    return (
                      <CartItem
                        key={id}
                        product={cartItem}
                        cartId={cartId}
                        isLoading={isLoading}
                      />
                    );
                  })}
                </ul>
                <div className="cart-page__total">
                  <div className="total__common">
                    <div className="total__common-item">
                      <div className="common-item__count">Total count</div>
                      <div className="common-item__count-value">{totalProducts} items</div>
                    </div>
                    <div className="total__common-item">
                      <div className="common-item__price">Price without discount</div>
                      <div className="common-item__price-value">{total.toFixed(2)}$</div>
                    </div>
                  </div>
                  <div className="total__item">
                    <div className="total__item-price">Total price</div>
                    <div className="total__item-value">{discountedTotal.toFixed(2)}$</div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </main>
  );
}

export default Cart;
