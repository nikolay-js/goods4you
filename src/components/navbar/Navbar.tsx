import { NavLink, useLocation } from 'react-router-dom';

import './style.css';

interface INavbarProps {
  footer?: boolean;
  totalQuantity?: number;
};

const Navbar: React.FC<INavbarProps> = ({ footer, totalQuantity }) => {
  const activeLink = 'nav-list__link nav-list__link--active';
  const normalLink = 'nav-list__link';
  const location = useLocation();

  return (
    <nav className={`nav${footer ? ' footer' : ''}`}>
      <div className="container">
        <div className="nav-row">
          <NavLink to="/" className="logo">
            Goods4you
					</NavLink>

          <ul className={`nav-list${location.pathname.substr(1) === 'login' ? ' login-page' : ''}`}>
            <li className="nav-list__item">
              <NavLink
                to={{ pathname: "/", hash: "#catalog" }}
                className={({ isActive }) =>
                  isActive && location.hash == "#catalog" ? activeLink : normalLink
                }
              >
                Catalog
							</NavLink>
            </li>
            <li className="nav-list__item">
              <NavLink
                to={{ pathname: "/", hash: "#faq" }}
                className={({ isActive }) =>
                  isActive && location.hash == "#faq" ? activeLink : normalLink
                }
              >
                FAQ
							</NavLink>
            </li>
            <li className="nav-list__item nav-list__item-cart">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `nav-list__item-cart ${isActive ? activeLink : normalLink}`
                }
              >
                Cart
                <span>
                  <img src="src/assets/icons/cart.svg" alt="Cart" />
                  {totalQuantity && <span className="nav-list__cart-quantity">{totalQuantity}</span>}
                </span>
              </NavLink>
            </li>
            <li className="nav-list__item nav-list__item-login">
              Johnson Smith
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
