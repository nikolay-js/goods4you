import Button from "../components/ui-kit/button/Button"

const Product: React.FC = () => {
  return (
    <main className="section">
      <div className="container">
        <div className="product-page">
          <img src="/src/assets/img/galery.png" alt="Carousel" />
          <div className="product-page__content">
            <div className="product-page__title">
              <h2 className="title-1">Essence Mascara Lash Princess</h2>
              <div className="product-page__rating">
                <img src="/src/assets/icons/rating.svg" alt="Stars rating" />
                <span className="product-page__rating-text">electronics, selfie accessories</span>
              </div>
            </div>
            <div className="product-page__in-stock">In Stock - Only 5 left!</div>
            <p className="product-page__description">The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.</p>
            <div className="product-page__warranty">
              <p>1 month warranty</p>
              <p>Ships in 1 month</p>
            </div>
            <div className="product-page__buy">
              <div className="product-page__prices">
                <p className="product-page__current-price">7.17$</p>
                <p className="product-page__price">9.99$</p>
              </div>
              <div className="product-page__discount">
                <p className="product-page__discount-text">Your discount:</p>
                <p className="product-page__discount-value">14.5%</p>
              </div>
              <Button type="button" className="product-page__btn">Add to cart</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Product;