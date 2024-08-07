import "./style.css";
import Button from "../ui-kit/button/Button";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <img className="header__img" src="src/assets/img/header-bg.png" alt="goods4you text" />
          <h1 className="header__title">Any products from famous brands with worldwide delivery</h1>
          <p className="header__text">We sell smartphones, laptops, clothes, shoes and many other products at low prices</p>
          <Button href="#catalog" className="header-btn">Go to shopping</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
