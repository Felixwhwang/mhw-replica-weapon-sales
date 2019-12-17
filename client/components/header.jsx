import React from 'react';

export default class Header extends React.Component {
  handleClickCart() {
    this.props.setView('cart', {});
  }

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
          <h3>$Wicked Sales</h3>
          <div className="pointer" onClick={this.handleClickCart.bind(this)}>
            {cartItems}<i className="fas fa-shopping-cart cart"></i>
          </div>
        </div>
      </nav>
    );
  }
}
