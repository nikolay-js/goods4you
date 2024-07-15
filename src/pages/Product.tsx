import { useState, useEffect } from "react";
import Button from "../components/ui-kit/button/Button"
import { productsApi } from "../redux/services/productsApi";
import { useParams, useNavigate } from "react-router-dom";
import { IProduct } from "../types";
import PageTitle from "../components/page-title/PageTitle";

const Product: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data = [], error, isLoading, isSuccess, status } = productsApi.useGetProductsByIdQuery({ id });
  const product: IProduct = data;
  const discountValue = ((product.price - product?.discountPercentage) * 100 / product.price).toFixed(2);
  const [mainImg, setMainImg] = useState<string>('');

  if (status === 'rejected') {
    navigate('/*');
  }

  useEffect(() => {
    setMainImg(product?.images?.[0]);
  }, [product?.images?.[0]]);

  return (
    <>
      {isSuccess && <PageTitle title={`${product.title} | Goods4you`} />}
      <main className="section">
        <div className="container">
          {isLoading && <h2>Is loading...</h2>}
          {error && <h2>{error}</h2>}
          {isSuccess && <div className="product-page">
            <div className="product-page__galery">
              <img src={mainImg} alt="Main image of galery" />
              {product.images.length > 1 &&
                <ul className="galery__scroll">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      className={`galery__scroll-item${image === mainImg ? '--active' : ''}`}
                      src={image}
                      onClick={() => setMainImg(image)}
                      alt="Item image of galery" />
                  ))}
                </ul>
              }
            </div>
            <div className="product-page__content">
              <div className="product-page__title">
                <h2 className="title-1">{product.title}</h2>
                <div className="product-page__rating">
                  <img src="/src/assets/icons/rating.svg" alt="Stars rating" />
                  <span className="product-page__rating-text">{product?.tags.join(' ')}</span>
                </div>
              </div>
              <div className="product-page__in-stock">In Stock - Only {product?.stock} left!</div>
              <p className="product-page__description">{product?.description}</p>
              <div className="product-page__warranty">
                <p>{product?.warrantyInformation}</p>
                <p>{product?.shippingInformation}</p>
              </div>
              <div className="product-page__buy">
                <div className="product-page__prices">
                  <p className="product-page__current-price">{product?.discountPercentage}$</p>
                  <p className="product-page__price">{product.price}$</p>
                </div>
                <div className="product-page__discount">
                  <p className="product-page__discount-text">Your discount:</p>
                  <p className="product-page__discount-value">{discountValue}%</p>
                </div>
                <Button type="button" className="product-page__btn">Add to cart</Button>
              </div>
            </div>
          </div>
          }
        </div>
      </main>
    </>
  );
}

export default Product;
