import React from 'react';
import { Link } from 'react-router-dom';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      product: '',
      mounted: false
    });
  }

  componentDidMount() {
    this.getProductById();
  }

  getProductById() {
    const a = new URL(window.location);
    const productId = a.pathname.toString().split('/').pop();
    // const productId = window.location.pathname.split('/').pop();
    fetch(`/api/products?productId=${productId}`)
      .then(res => res.json())
      .then(product => {
        this.setState({ product });
      }).catch(err => alert('getProductById error', err));
  }

  handleClickAdd() {
    this.props.addToCart(this.state.product);
  }

  render() {
    if (!this.state.mounted) {
      return null;
    } else {
      return (
        <div className="container bg-white border p-4">
          <Link to={'/'}>
            <div className="pointer mb-2 text-muted">{'<  '}Back to catalog</div>
          </Link>
          <div className="row">
            <img src={`../${this.state.product.image}`} className="col-5 size"/>
            <div className="col-7">
              <h2>{this.state.product.name}</h2>
              <label className="text-muted">${(this.state.product.price / 100).toFixed(2)}</label>
              <p>{this.state.product.shortDescription}</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleClickAdd.bind(this)}>Add to Cart
              </button>
            </div>
          </div>
          <p className="mt-3">{this.state.product.longDescription}</p>
        </div>
      );
    }
  }
}
