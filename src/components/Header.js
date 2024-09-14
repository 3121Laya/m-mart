import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHome, faBox, faSignOutAlt, faSignInAlt, faUserPlus, faUser, faPlus, faList } from "@fortawesome/free-solid-svg-icons";
import mart from './mart.jpg';
import './Header.css';

const Header = () => {
  const { currentUser, signout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-custom py-3 shadow-sm">
      <div className="container-fluid">
        <div className="navbar-brand d-flex align-items-center">
          <h3 className="mb-0 marquee-text">
            E MART
            <img src={mart} alt="E Mart" className="marquee-img ms-2" />
          </h3>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <>
                {/* Standard User Menu */}
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/home">
                    <FontAwesomeIcon icon={faHome} className="me-2" />
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/products">
                    <FontAwesomeIcon icon={faBox} className="me-2" />
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/orders">
                    <FontAwesomeIcon icon={faBox} className="me-2" />
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                    Cart
                  </Link>
                </li>

                {/* Admin-specific Menu */}
                {currentUser.role === 'admin' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/admin/add-product">
                        <FontAwesomeIcon icon={faPlus} className="me-2" />
                        Add Product
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/admin/all-products">
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        Product List
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/admin/users">
                        <FontAwesomeIcon icon={faUser} className="me-2" />
                        Users List
                      </Link>
                    </li>
                  </>
                )}

                {/* Logged-in User Info */}
                <li className="nav-item">
                  <span className="nav-link text-white">
                    Welcome, {currentUser.name || currentUser.email}
                  </span>
                </li>

                {/* Logout Button */}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light"
                    onClick={signout}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Non-authenticated User Menu */}
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/signin">
                    <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/signup">
                    <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
