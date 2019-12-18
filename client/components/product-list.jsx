import React from 'react';
import ProductListItem from './product-list-item';
import Footer from './footer';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = ({
      array: []
    });
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(array => {
        this.setState({ array });
      }).catch(err => alert('getProducts Error: ', err));
  }

  render() {
    const items = [];
    this.state.array.forEach((cur, index) => {
      items.push(<ProductListItem
        key={cur.productId}
        item={cur}
      />);
    });
    return (
      <div>
        <div className="container">
          <div className="row">
            {items}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
