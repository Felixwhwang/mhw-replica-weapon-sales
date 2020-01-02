import React from 'react';
import { Link } from 'react-router-dom';
import AddModal from './add-modal';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      product: ''
    });
  }

  componentDidMount() {
    this.getProductById();
  }

  getProductById() {
    const { search } = this.props.location;
    const productId = search.split('?').pop();
    fetch(`/api/products?productId=${productId}`)
      .then(res => res.json())
      .then(product => {
        product.quantity = 1;
        this.setState({ product });
      }).catch(err => alert('getProductById error', err));
  }

  handleClickAdd() {
    this.props.addToCart(this.state.product);
  }

  quantityOnChange(event) {
    const { product } = this.state;
    product.quantity = event.target.value;
    this.setState({ product });
  }

  render() {
    const options = [];
    for (let index = 1; index < 11; index++) {
      options.push(<option key={index} value={index}>{index}</option>);
    }
    return (
      <div className="mt-4">
        <div className="container bg-white border-black p-4">
          <Link to={'/'}>
            <div className="pointer mb-2 text-muted">{'<  '}Back to catalog</div>
          </Link>
          <div className="row">
            <img src={`../${this.state.product.image}`} className="col-5 size" />
            <div className="col-7">
              <h2>{this.state.product.name}</h2>
              <label className="text-muted">${(this.state.product.price / 100).toFixed(2)}</label>
              <p>{this.state.product.shortDescription}</p>

              <div className="mb-2">
                <div>Item Quantity:</div>
                <select
                  className="d-block"
                  onChange={this.quantityOnChange.bind(this)}>
                  {options}
                </select>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#addmodal"
                data-backdrop="static"
                data-keyboard="false"
                onClick={this.handleClickAdd.bind(this)}>Add to Cart
              </button>
            </div>
          </div>
          <p className="mt-3">{this.state.product.longDescription}</p>
        </div>
        <AddModal history={this.props.history}/>
      </div>
    );
  }
}
