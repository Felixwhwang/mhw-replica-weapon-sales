import React from 'react';

export default class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = ({ product: '' });
  }

  componentDidMount() {
    this.getProductById();
  }

  getProductById() {
    fetch(`/api/products?productId=${this.props.id}`)
      .then(res => res.json())
      .then(product => {
        this.setState({ product });
      }).catch(err => alert('getProductById error', err));
  }

  handleClickBack() {
    this.props.setView('catalog', {});
  }

  handleClickAdd() {
    this.props.addToCart(this.state.product);
  }

  render() {
    return (
      <div className="container bg-white border p-4">
        <div onClick={this.handleClickBack.bind(this)} className="pointer mb-2 text-muted">{'<  '}Back to catalog</div>
        <div className="row">
          <img src={this.state.product.image} className="col-5 size"/>
          <div className="col-7">
            <h2>{this.state.product.name}</h2>
            <label className="text-muted">${(this.state.product.price / 100).toFixed(2)}</label>
            <p>{this.state.product.shortDescription}</p>
            <button type="button" className="btn btn-primary" onClick={this.handleClickAdd.bind(this)}>Add to Cart</button>
          </div>
        </div>
        <p className="mt-3">{this.state.product.longDescription}</p>
      </div>
    );
  }
}
