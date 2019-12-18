import React from 'react';

class CartSummaryItems extends React.Component {
  render() {
    return (
      <div className="row border mb-4 bg-white shadow-sm p-3">
        <img src={this.props.item.image} className="col-5 size" />
        <div className="col-7">
          <h2>{this.props.item.name}</h2>
          <label className="text-muted">${(this.props.item.price / 100).toFixed(2)}</label>
          <p>{this.props.item.shortDescription}</p>
        </div>
      </div>
    );
  }
}

export default class CartSummary extends React.Component {
  handleClickBack() {
    this.props.setView('catalog', {});
  }

  handleClickOrder() {
    if (this.props.cart.length !== 0) {
      this.props.setView('checkout', {});
    }
  }

  render() {
    let total = null;
    const itemRows = this.props.cart.map(cur => {
      total += cur.price;
      return <CartSummaryItems key={cur.cartItemId} item={cur}/>;
    });
    return (
      <div className="container">
        <div onClick={this.handleClickBack.bind(this)} className="pointer mb-2 text-muted">{'<  '}Back to catalog</div>
        <h2>My Cart</h2>
        <div className="row">
          {itemRows}
        </div>
        <div className="d-flex justify-content-between">
          <h3>Item Total ${(total / 100).toFixed(2)}</h3>
          <button type="button" className="btn btn-primary" onClick={this.handleClickOrder.bind(this)}>Check Out</button>
        </div>
      </div>
    );
  }
}
