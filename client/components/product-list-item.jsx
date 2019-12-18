import React from 'react';

export default class ProductListItem extends React.Component {
  handleClickItem() {
    this.props.setView('details', { productId: this.props.item.productId });
  }

  render() {
    const price = (this.props.item.price / 100).toFixed(2);
    return (
      <div className="col-lg-4 col-md-6 p-2 pointer" onClick={this.handleClickItem.bind(this)}>
        <div className="card shadow-sm h-100">
          <img src={this.props.item.image} className="card-img-top size" alt="" />
          <div className="card-body">
            <h5 className="card-title">{this.props.item.name}</h5>
            <label className="text-muted">${price}</label>
            <p className="card-text">{this.props.item.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
