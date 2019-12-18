import React from 'react';
import { Link } from 'react-router-dom';

export default class CheckoutForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
  }

  handleClickOrder(event) {
    event.preventDefault();
    const checkoutInfo = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.placeOrder(checkoutInfo);
    this.props.history.push('/');
  }

  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const total = this.props.cart.reduce((acc, cur) => acc + cur.price, 0);
    return (
      <div className="container checkout-form">
        <h2>My Cart</h2>
        <label className="text-muted">Order Total: ${(total / 100).toFixed(2)}</label>
        <form onSubmit={this.handleClickOrder.bind(this)}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.handleOnChange.bind(this)}
              required/>
          </div>
          <div className="form-group">
            <label>Credit Card</label>
            <input
              type="text"
              className="form-control"
              placeholder="credit card"
              autoComplete="off"
              name="creditCard"
              value={this.state.creditCard}
              onChange={this.handleOnChange.bind(this)}
              minLength='16'
              maxLength='16'
              required/>
          </div>
          <div className="form-group">
            <label>Shipping Address</label>
            <textarea
              className="form-control resize-none"
              rows="5" placeholder="shipping address"
              autoComplete="off"
              name="shippingAddress"
              value={this.state.shippingAddress}
              onChange={this.handleOnChange.bind(this)}
              required/>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Link to={'/'}>
              <div className="pointer mb-2 text-muted">{'<  '}Back to catalog</div>
            </Link>
            <button
              type="submit"
              className="btn btn-primary">
                Place Order
            </button>
          </div>
        </form>
      </div>
    );
  }
}
