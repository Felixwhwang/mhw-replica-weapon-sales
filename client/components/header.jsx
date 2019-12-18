import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    let cartItems = '';
    const numbers = this.props.cartItems;
    if (numbers < 2) {
      cartItems = `${numbers} item`;
    } else {
      cartItems = `${numbers} items`;
    }
    return (
      <nav className="navbar navbar-light bg-dark text-white mb-3">
        <div className="container">
          <h3>Game Weapon Sales</h3>
          <Link to={'/cart'}>
            <div className="pointer text-white">
              {cartItems}<i className="fas fa-shopping-cart cart"></i>
            </div>
          </Link>
        </div>
      </nav>
    );
  }
}
