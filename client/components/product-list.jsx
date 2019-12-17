import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = ({ array: [] });
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
    let row = [];
    this.state.array.forEach((cur, index) => {
      row.push(<ProductListItem key={cur.productid} item={cur} setView={this.props.setView.bind(this)}/>);
      if ((index + 1) % 3 === 0) {
        items.push(
          <div key={index + 1} className="row">
            {row}
          </div>
        );
        row = [];
      }
    });
    return (
      <div className="container">
        {items}
      </div>
    );
  }
}
