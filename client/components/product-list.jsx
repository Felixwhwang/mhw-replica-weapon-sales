import React from 'react';
import ProductListItem from './product-list-item';

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
        setView={this.props.setView.bind(this)}/>);
    });
    return (
      <div className="container">
        {items}
      </div>
    );
  }
}
