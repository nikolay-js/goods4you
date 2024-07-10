import CartItem from "../components/cart-item/CartItem";

const mockedCartItems = [
	{
		id: 0,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/cart-item.png',
		price: 110,
		quantity: 1,
	},
	{
		id: 1,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/cart-item.png',
		price: 110,
		quantity: 1,
	},
	{
		id: 2,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/cart-item.png',
		price: 110,
		quantity: 5,
	},
	{
		id: 3,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/cart-item.png',
		price: 110,
	},
];

const Cart: React.FC = () => {
  return (
    <main className="section">
      <div className="container">
        <div className="cart-page">
          <h2 className="title-1">My cart</h2>
          <div className="cart-page__content">
            <ul className="cart-page__items">
              {mockedCartItems.map((cartItem, id) => { // TODO: change to products from api
                return (
                  <CartItem
                    key={id}
                    title={cartItem.title}
                    img={cartItem.img}
                    price={cartItem.price}
                    quantity={cartItem.quantity}
                    id={11} // TODO: change
                  />
                );
              })}
            </ul>
            <div className="cart-page__total">
              <div className="total__common">
                <div className="total__common-item">
                  <div className="common-item__count">Total count</div>
                  <div className="common-item__count-value">3 items</div>
                </div>
                <div className="total__common-item">
                  <div className="common-item__price">Price without discount</div>
                  <div className="common-item__price-value">700$</div>
                </div>
              </div>
              <div className="total__item">
                <div className="total__item-price">Total price</div>
                <div className="total__item-value">590$</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;