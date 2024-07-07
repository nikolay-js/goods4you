import { NavLink } from 'react-router-dom';

import './style.css';

interface INavbarProps {
  footer?: boolean;
};

const Navbar: React.FC<INavbarProps> = ({ footer }) => {
  const activeLink = 'nav-list__link nav-list__link--active';
  const normalLink = 'nav-list__link';

  return (
    <nav className={`nav${footer ? ' footer' : ''}`}>
      <div className="container">
        <div className="nav-row">
          <NavLink to="/" className="logo">
            Goods4you
					</NavLink>

          <ul className="nav-list">
            <li className="nav-list__item">
              {/* <NavLink
                to="catalog"
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              > */}
                <a href="#catalog">Catalog</a>
							{/* </NavLink> */}
            </li>
            <li className="nav-list__item">
              <NavLink
                to="/#faq"
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
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
                Cart<span><img src="src/assets/icons/cart.svg" alt="Cart" /><span className="nav-list__cart-quantity">1</span></span>
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
