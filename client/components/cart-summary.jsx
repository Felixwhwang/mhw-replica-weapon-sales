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
    if (qty > 19 && qty.indexOf('.') === -1) {
      this.setState({
        quantity: 19,
        qtyValidation: 'Ask Wenhao for wholesales if more than 19'
      });
    } else if (qty > 0 && qty.indexOf('.') === -1) {
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
      <div className="row border-black mb-4 bg-white shadow-sm p-3">
        <img src={this.props.item.image} className="col-12 col-md-5 size" />
        <div className="col-12 col-md-7">
          <h2>{this.props.item.name}</h2>
          <label className="text-muted">${(this.props.item.price / 100).toFixed(2)}</label>
          <p>{this.props.item.shortDescription}</p>
          <div>Item Quantity:</div>
          <input
            className="border shadow-sm input-quantity"
            type="text"
            value={this.state.quantity}
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
      <div className="container">
        <Link to={'/'}>
          <div className="pointer mb-2 text-white">{'<  '}Back to catalog</div>
        </Link>
        <div className="my-cart">My Cart</div>
        <div className="container">
          {itemRows}
        </div>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div className="bg-white border-black p-2">Item Total ${(total / 100).toFixed(2)}</div>
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
