import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer';

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

export default class CheckoutForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      usState: '',
      zipcode: '',
      country: 'US',
      nameOnCard: '',
      creditCard: '',
      expMonth: '',
      expYear: '',
      cvv: '',
      expYearCheck: ''
    };
  }

  handleClickOrder(event) {
    event.preventDefault();
    const checkoutInfo = {
      name: this.state.firstName + ' ' + this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      shippingAddress: this.state.address + ', ' + this.state.city + ', ' +
        this.state.usState + ', ' + this.state.zipcode + ', ' +
        this.state.country,
      nameOnCard: this.state.nameOnCard,
      creditCard: this.state.creditCard,
      expDate: this.state.expMonth + '/' + this.state.expYear
    };

    this.props.placeOrder(checkoutInfo);
    this.props.history.push('/order-confirmation');
  }

  handleOnChange(event) {
    const name = event.target.name;
    if (name === 'country') return;
    if (name === 'creditCard' || name === 'phone' || name === 'zipcode' ||
    name === 'cvv') {
      if (parseInt(event.target.value.slice(-1)) > 0 ||
      event.target.value === '') {
        this.setState({ [name]: event.target.value });
      }
    } else if (name === 'usState') {
      const letters = 'abcdefghijklmnopqrstuvwxyz';
      if (letters.indexOf(event.target.value.slice(-1).toLowerCase()) !== -1 ||
        event.target.value === '') {
        this.setState({ [event.target.name]: event.target.value.toUpperCase() });
      }
    } else {
      this.setState({ [name]: event.target.value });
    }
  }

  creditCardOnChange(event) {
    if (parseInt(event.target.value.slice(-1)) ||
      event.target.value === '') {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  expYearOnChange(event) {
    const today = new Date();
    const toYear = parseInt(today.getFullYear().toString().slice(-2)) + 1;
    if (parseInt(event.target.value.slice(-1)) >= 0 ||
      event.target.value === '') {
      if (parseInt(event.target.value) >= toYear) {
        this.setState({
          [event.target.name]: event.target.value,
          expYearCheck: ''
        });
      } else {
        this.setState({
          [event.target.name]: event.target.value,
          expYearCheck: 'please input correct year'
        });
      }
    }
  }

  expMonthOnChange(event) {
    if ((parseInt(event.target.value[0]) === 0 && event.target.value[1] !== '0') ||
      event.target.value === '') {
      this.setState({ [event.target.name]: event.target.value });
    }
    if ((parseInt(event.target.value[0]) === 1 && !event.target.value[1]) ||
      event.target.value === '10' ||
      event.target.value === '11' ||
      event.target.value === '12' ||
      event.target.value === '') {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  // checkExpirationDate(year) {
  //   const today = new Date();
  //   const toYear = parseInt(today.getFullYear().toString().slice(-2));
  //   const toMonth = today.getMonth() + 1;
  //   if (parseInt(this.state.expYear) === toYear) {
  //     if (parseInt(this.state.expMonth) <= toMonth) {
  //       return false;
  //     }
  //   }
  //   if (parseInt(this.state.expYear) < toYear) {
  //     return false;
  //   }
  //   return true;
  // }

  render() {
    let disable = false;
    if (this.state.expYearCheck === '') {
      disable = false;
    } else {
      disable = true;
    }
    const total = this.props.cart.reduce(
      (acc, cur) => acc + cur.price * cur.quantity, 0);
    return (
      <div>
        <div className="container basic-bg p-3">
          <h2>Check Out</h2>
          <p className="text-danger">*Please do NOT enter any real personal
          information! This form is for demo purposes ONLY.</p>
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
                    data-animation="true"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Tax rate of 5%" />
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
                {this.props.cart.map(cur => {
                  return <OrderDetails key={cur.productId} item={cur} />;
                })}
              </div>
            </div>

            <form
              onSubmit={this.handleClickOrder.bind(this)}
              className="col-12 col-md-7">
              <div className="form-group">
                <h3>Shipping Info</h3>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-6">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      autoComplete="off"
                      name="firstName"
                      minLength="2"
                      maxLength="32"
                      value={this.state.firstName}
                      onChange={this.handleOnChange.bind(this)}
                      required />
                  </div>
                  <div className="col-6">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      autoComplete="off"
                      name="lastName"
                      minLength="2"
                      maxLength="32"
                      value={this.state.lastName}
                      onChange={this.handleOnChange.bind(this)}
                      required />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-6">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      autoComplete="off"
                      name="email"
                      minLength="6"
                      maxLength="254"
                      value={this.state.email}
                      onChange={this.handleOnChange.bind(this)}
                      required />
                  </div>
                  <div className="col-6">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      autoComplete="off"
                      name="phone"
                      minLength="10"
                      maxLength="10"
                      value={this.state.phone}
                      onChange={this.handleOnChange.bind(this)}/>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Shipping Address</label>
                <textarea
                  className="form-control resize-none"
                  rows="1"
                  placeholder="Shipping Address"
                  autoComplete="off"
                  name="address"
                  minLength="6"
                  maxLength="84"
                  value={this.state.address}
                  onChange={this.handleOnChange.bind(this)}
                  required />
              </div>

              <div className="form-group">
                <div className="row">
                  <div className="col-6 col-md-3">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      autoComplete="off"
                      name="city"
                      minLength="3"
                      maxLength="50"
                      value={this.state.city}
                      onChange={this.handleOnChange.bind(this)} />
                  </div>
                  <div className="col-6 col-md-3">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="CA"
                      autoComplete="off"
                      name="usState"
                      minLength="2"
                      maxLength="2"
                      value={this.state.usState}
                      onChange={this.handleOnChange.bind(this)} />
                  </div>
                  <div className="col-6 col-md-3">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Zipcode"
                      autoComplete="off"
                      name="zipcode"
                      minLength="5"
                      maxLength="5"
                      value={this.state.zipcode}
                      onChange={this.handleOnChange.bind(this)} />
                  </div>
                  <div className="col-6 col-md-3">
                    <label>Country</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="US"
                      autoComplete="off"
                      name="country"
                      value={this.state.country}
                      onChange={this.handleOnChange.bind(this)} />
                  </div>
                </div>
              </div>

              <h3>Payment Info</h3>
              <div className="form-group">
                <label>Name On Card</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  autoComplete="off"
                  name="nameOnCard"
                  value={this.state.nameOnCard}
                  onChange={this.handleOnChange.bind(this)}
                  minLength='5'
                  maxLength='65'
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
                  onChange={this.creditCardOnChange.bind(this)}
                  minLength='16'
                  maxLength='16'
                  required />
              </div>
              <label>Expiration Date</label>
              <div className="form-group">
                <div className="row">
                  <div className="col-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="MM"
                      autoComplete="off"
                      name="expMonth"
                      value={this.state.expMonth}
                      onChange={this.expMonthOnChange.bind(this)}
                      minLength='2'
                      maxLength='2'
                      required />
                  </div>
                  <div className="col-0.1">
                    <div className="slash">/</div>
                  </div>
                  <div className="col-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="YY"
                      autoComplete="off"
                      name="expYear"
                      value={this.state.expYear}
                      onChange={this.expYearOnChange.bind(this)}
                      minLength='2'
                      maxLength='2'
                      required />
                  </div>
                  <div className="col-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="CVV"
                      autoComplete="off"
                      name="cvv"
                      value={this.state.cvv}
                      onChange={this.handleOnChange.bind(this)}
                      minLength='3'
                      maxLength='3'
                      required />
                  </div>
                </div>
              </div>
              <div className="text-danger">{this.state.expYearCheck}&nbsp;</div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" required/>
                <label className="form-check-label">
                    I agree that this was not a <b>REAL</b> purchase
                </label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <Link to={'/'}>
                  <div className="pointer mb-2 text-muted">Continue shopping</div>
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={disable}>
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
