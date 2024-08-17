import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/ui-kit/button/Button"
import { useGetProductsByIdQuery } from "../redux/services/productsApi";
import PageTitle from "../components/page-title/PageTitle";
import ProductControl from "../components/product-control/ProductControl";
import { IProduct } from "../types";
import { useAppSelector } from "../hooks/redux";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/reducers/cartsSlice";
import { AppDispatch } from "../redux/store";

interface IProductPage {
  me: string,
  isMe: boolean,
};

const Product: React.FC<IProductPage> = ({ me, isMe }) => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [mainImg, setMainImg] = useState<string>('');
  const { carts = [], isLoading: isLoadingCart } = useAppSelector((state) => state.cartReducer);
  const { data, error, isSuccess, isError, status } = useGetProductsByIdQuery({ id, authorization: me }, { skip: !isMe, refetchOnMountOrArgChange: true });
  const product = data as unknown as IProduct;
  const discountValue = (product.price - (product.price * (product?.discountPercentage ?? 0) / 100)).toFixed(2);
  const cartId = carts?.[0]?.id;
  const cartProducts = carts?.[0]?.products ?? [];
  const quantityProductInCart = cartProducts.find((item: IProduct) => item.id === Number(id))?.quantity;

  useEffect(() => {
    if (status === 'rejected') navigate('/*');
  }, [status]);

  useEffect(() => {
    setMainImg(product?.images?.[0] ?? '');
  }, [product?.images?.[0]]);

  useEffect(() => {
    if (isError) {
      if ('error' in error) alert(error.error);
      if ('data' in error && typeof error.data === 'object' && error.data && 'message' in error.data) alert(error.data.message);
      if ('message' in error) alert(error.message);
    }
  }, [isError]);

  return (
    <>
      {isSuccess && <PageTitle title={`${product.title} | Goods4you`} />}
      <main className="section">
        <div className="container">
          {isSuccess && <div className="product-page">
            <div className="product-page__galery">
              <img src={mainImg} alt="Main image of galery" />
              {(product?.images ?? []).length > 1 &&
                <ul className="galery__scroll">
                  {(product?.images ?? []).map((image, index) => (
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
                  <div className="product-page__stars">
                    {[...Array(5)].map((_, index) => {
                      index += 1;
                      return (
                        <img key={index} className="product-page__star" src={`/./images/img/star${index <= Math.round(product?.rating ?? 0) ? '-on' : ''}.png`} alt="Star" />
                      );
                    })}
                  </div>
                  <span className="product-page__rating-text">{(product?.tags ?? []).join(' ')}</span>
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
                  <p className="product-page__current-price">{discountValue}$</p>
                  <p className="product-page__price">{product.price}$</p>
                </div>
                <div className="product-page__discount">
                  <p className="product-page__discount-text">Your discount:</p>
                  <p className="product-page__discount-value">{product?.discountPercentage}%</p>
                </div>
                {quantityProductInCart ? (
                  <ProductControl
                    product={product}
                    isLoading={isLoadingCart}
                    cartId={cartId}
                    quantityProductInCart={quantityProductInCart}
                  />
                ) : (
                    <Button
                      type="button"
                      className="product-page__btn"
                      disabled={isLoadingCart}
                      onClick={() => dispatch(addProduct({ cartId, productId: product.id }))}
                    >
                      Add to cart
                    </Button>
                  )}
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
