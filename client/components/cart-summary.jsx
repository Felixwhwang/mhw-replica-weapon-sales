import React from 'react';
import RemoveModal from './remove-modal';
import { Link } from 'react-router-dom';

class CartSummaryItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.item.quantity,
      qtyValidation: ''
    };
  }

  quantityOnChange(event) {
    const qty = event.target.value;
    if (qty > 0 && qty.indexOf('.') === -1) {
      this.setState({
        quantity: qty,
        qtyValidation: ''
      });
    } else {
      this.setState({
        quantity: '',
        qtyValidation: 'Leave empty will still count as original quantity'
      });
    }
  }

  render() {
    const display =
      this.props.item.quantity === parseInt(this.state.quantity) ||
      this.state.quantity === ''
        ? 'd-none' : '';
    return (
      <div className="row border-bottom mb-4 bg-white p-3">
        <div className="col-12 col-md-5">
          <Link to={`/item?${this.props.item.productId}`}>
            <img src={this.props.item.image} className="col-12 size" />
          </Link>
        </div>
        <div className="col-12 col-md-7">
          <h2>{this.props.item.name}</h2>
          <label className="text-muted">${(this.props.item.price / 100).toFixed(2)}</label>
          <p>{this.props.item.shortDescription}</p>
          <div>Item Quantity:</div>
          <input
            className="border shadow-sm input-quantity"
            type="text"
            value={this.state.quantity}
            maxLength="9"
            onChange={this.quantityOnChange.bind(this)} />
          <div className="text-danger">{this.state.qtyValidation}&nbsp;</div>
          <Link to={`/cart?${this.props.item.cartItemId}`}>
            <button
              type="button"
              className="btn btn-danger"
              data-toggle="modal"
              data-target="#removemodal"
              data-backdrop="static"
              data-keyboard="false">Remove
            </button>
          </Link>
          <button
            type="button"
            className={`btn btn-success ml-2 ${display}`}
            onClick={() => this.props.updateItem(
              {
                cartItemId: this.props.item.cartItemId,
                quantity: this.state.quantity
              }
            )}>Update
          </button>
        </div>
      </div>
    );
  }
}

export default class CartSummary extends React.Component {
  handleClickOrder() {
    this.props.history.push('/checkout');
  }

  getRemoveItem(cartItemId) {
    for (let index = 0; index < this.props.cart.length; index++) {
      if (this.props.cart[index].cartItemId === parseInt(cartItemId)) {
        return this.props.cart[index];
      }
    }
    return {};
  }

  render() {
    const checkoutStatus = this.props.cart.length === 0;
    let total = null;
    const itemRows = this.props.cart.map(cur => {
      total += cur.quantity * cur.price;
      return <CartSummaryItems
        key={cur.cartItemId}
        item={cur}
        updateItem={this.props.updateItem} />;
    });
    return (
      <div className="container basic-bg mb-5">
        <Link to={'/'}>
          <div className="pointer mb-2 mt-3 text-muted">{'<  '}Back to catalog</div>
        </Link>
        <h3>My Cart</h3>
        <div className="container">
          {itemRows}
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="bg-white basic-bg p-2">Item Total ${(total / 100).toFixed(2)}</div>
          <button
            type="button"
            className="btn btn-primary ml-1"
            disabled={checkoutStatus}
            onClick={this.handleClickOrder.bind(this)}>Check Out
          </button>
        </div>
        <RemoveModal
          deleteItem={this.props.removeItem}
          removeItem={this.getRemoveItem(this.props.location.search.split('?').join(''))}/>
      </div>
    );
  }
}
