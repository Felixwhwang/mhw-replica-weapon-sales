import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
  }

  handleClickContinue() {
    this.props.setView('catalog', {});
  }

  handleClickOrder() {
    const checkoutInfo = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.placeOrder(checkoutInfo);
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
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" placeholder="name" autoComplete="off"
              name="name" value={this.state.name} onChange={this.handleOnChange.bind(this)}/>
          </div>
          <div className="form-group">
            <label>Credit Card</label>
            <input type="text" className="form-control" placeholder="credit card" autoComplete="off"
              name="creditCard" value={this.state.creditCard} onChange={this.handleOnChange.bind(this)}/>
          </div>
          <div className="form-group">
            <label>Shipping Address</label>
            <textarea className="form-control resize-none" rows="5" placeholder="shipping address" autoComplete="off"
              name="shippingAddress" value={this.state.shippingAddress} onChange={this.handleOnChange.bind(this)}/>
          </div>
        </form>
        <div className="d-flex justify-content-between align-items-center">
          <div onClick={this.handleClickContinue.bind(this)} className="pointer mb-2 text-muted">{'<  '}Back to catalog</div>
          <button type="button" className="btn btn-primary" onClick={this.handleClickOrder.bind(this)}>Place Order</button>
        </div>
      </div>
    );
  }
}
