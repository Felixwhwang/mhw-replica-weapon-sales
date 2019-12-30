import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

class OrderDetails extends React.Component {
  render() {
    return (
      <div className="row bg-white">
        <img src={this.props.item.image} className="col-3 item-summary" />
        <div className="col-9">
          <div>{this.props.item.name}</div>
          <div>Item Quantity: {this.props.item.quantity}</div>
          <label className="text-muted">${(this.props.item.price / 100).toFixed(2)}</label>
        </div>
      </div>
    );
  }
}

export default class OrderConfirmation extends React.Component {
  render() {
    const total = this.props.orderInfo.cart.reduce(
      (acc, cur) => acc + cur.price * cur.quantity, 0);
    return (
      <div className="container basic-bg p-3">
        <h1 className="text-center">Thank you for shopping at my store!</h1>
        <h3 className="text-center">Order Confirmation</h3>
        <div className="row">
          <div className="col-12 col-md-5 p-3">
            <h4>Order Summary</h4>
            <div>
              <h5>
                SubTotal:
                <div className="d-line float-right">${(total / 100).toFixed(2)}</div>
              </h5>
            </div>
            <div>
              <h5>
                Shipping:
                <div className="d-inline float-right">Free</div>
              </h5>
            </div>
            <div>
              <h5>
                Taxes:
                <i
                  className="ml-1 fas fa-question-circle"
                  data-tip="Tax rate of 5%"/>
                <div className="float-right d-inline">${(total * 0.05 / 100).toFixed(2)}</div>
              </h5>
            </div>
            <hr />
            <div>
              <h5>
                Total:
                <div className="d-inline float-right">${(total * 1.05 / 100).toFixed(2)}</div>
              </h5>
            </div>
            <hr />
            <h4>Items in Cart</h4>
            <div className="container order-summary">
              {this.props.orderInfo.cart.map(cur => {
                return <OrderDetails key={cur.productId} item={cur} />;
              })}
            </div>
          </div>

          <div className="col-12 col-md-7 p-3 order-info">
            <h4>Shipping To:</h4>
            <div>Name: {this.props.orderInfo.checkoutInfo.name}</div>
            <div>Email: {this.props.orderInfo.checkoutInfo.email}</div>
            <div>Phone: {this.props.orderInfo.checkoutInfo.phone}</div>
            <div>Shipping Address:</div>
            <div>{this.props.orderInfo.checkoutInfo.shippingAddress}</div>
            <hr />
            <h4>Billing To:</h4>
            <div>Name: {this.props.orderInfo.checkoutInfo.nameOnCard}</div>
            <div>Card ending in: {this.props.orderInfo.checkoutInfo.creditCard.slice(-4)}</div>
            <div>Expiration Date: {this.props.orderInfo.checkoutInfo.expDate}</div>
            <Link to={'/'}>
              <button className="btn btn-primary mt-4">Back to Store</button>
            </Link>
          </div>
        </div>
        <ReactTooltip />
      </div>
    );
  }
}
