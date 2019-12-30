import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    let cartItems = '';
    const numbers = this.props.cartItems.reduce((sum, cur) => {
      return sum + cur.quantity;
    }, 0);
    if (numbers < 2) {
      cartItems = `${numbers} item`;
    } else {
      cartItems = `${numbers} items`;
    }
    return (
      <nav className="navbar navbar-light bg-dark text-white nav-bg">
        <div className="container">
          <Link to={'/'}>
            <div className="logo">Game Weapon Sales</div>
          </Link>
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
