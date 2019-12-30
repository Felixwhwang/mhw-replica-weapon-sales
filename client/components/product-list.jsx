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
        <div className="carousel-size">
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner position-relative">
              <div className="carousel-item active" data-interval="5000">
                <div className="h-100 w-100 carousel-slide slide-1"></div>
                <div className="carousel-caption d-md-block center-caption">
                  <h3>Top Quality Replica Weapon</h3>
                  <p>We take pride in the fact that we provide best replica weapon for collector.</p>
                </div>
              </div>
              <div className="carousel-item" data-interval="5000">
                <div className="h-100 w-100 carousel-slide slide-2"></div>
                <div className="carousel-caption d-md-block center-caption">
                  <h3>Free Shipping Ever</h3>
                  <p>We provide free shipping ever just in United States.</p>
                </div>
              </div>
              <div className="carousel-item" data-interval="5000">
                <div className="h-100 w-100 carousel-slide slide-3"></div>
                <div className="carousel-caption d-md-block center-caption">
                  <h3>Don&apos;t worry, We have it.</h3>
                  <p>We provide any custom weapon forging with best service.</p>
                </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
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
