import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer';

class OrderDetails extends React.Component {
  render() {
    return (
      <div className="row bg-white">
        <img src={this.props.item.image} className="col-3" />
        <div className="col-9">
          <div>{this.props.item.name}</div>
          <div>Item Quantity: {this.props.item.quantity}</div>
          <label className="text-muted">${(this.props.item.price / 100).toFixed(2)}</label>
        </div>
      </div>
    );
  }
}

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
    if (event.target.name === 'creditCard') {
      if (parseInt(event.target.value.slice(-1)) > 0 ||
      event.target.value === '') {
        this.setState({ [event.target.name]: event.target.value });
      }
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  render() {
    const total = this.props.cart.reduce((acc, cur) => acc + cur.price, 0);
    return (
      <div>
        <div className="container basic-bg p-3">
          <h2>Check Out</h2>
          <p className="text-danger">*Please do NOT enter any real personal information! This form is for demo purposes ONLY.</p>
          <div className="row">
            <div className="col-12 col-md-5 p-3">
              <h4>Order Summary</h4>
              <div className="container order-summary">
                {this.props.cart.map(cur => {
                  return <OrderDetails key={cur.productId} item={cur} />;
                })}
              </div>
              <h4>Order Total: ${(total / 100).toFixed(2)}</h4>
            </div>
            <form
              onSubmit={this.handleClickOrder.bind(this)}
              className="col-12 col-md-7 form-view">
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
                  required />
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
                  required />
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
                  required />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <Link to={'/'}>
                  <div className="pointer mb-2 text-muted">Continue shopping</div>
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary">
                  Place Order
                </button>
              </div>
              <div className="form-img"></div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
