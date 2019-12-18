import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
  }

  componentDidMount() {
    this.getCartItems();
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cart => {
        this.setState({ cart });
      }).catch(err => alert('getCartItems error', err));
  }

  placeOrder(checkoutInfo) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkoutInfo)
    };
    fetch('/api/orders', req)
      .then(res => res.json())
      .then(checkoutInfo => {
        this.setState({
          view: { name: 'catalog', params: {} },
          cart: []
        });
      }).catch(err => alert('placeOrder error', err));
  }

  setView(name, params) {
    const view = {
      name,
      params
    };
    this.setState({ view });
  }

  addToCart(product) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', req)
      .then(res => res.json())
      .then(item => {
        this.setState({ cart: this.state.cart.concat(item) });
      }).catch(err => alert('addToCart error', err));
  }

  render() {
    return (
      <Router>
        <Header cartItems={this.state.cart.length} />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/item/:productId"
            render={props => <ProductDetails {...props}
              addToCart={this.addToCart.bind(this)} />} />
          <Route path="/cart"
            render={props => <CartSummary {...props}
              cart={this.state.cart} />} />
          <Route path="/checkout"
            render={props => <CheckoutForm {...props}
              cart={this.state.cart}
              placeOrder={this.placeOrder.bind(this)} />} />
        </Switch>
      </Router>
    );
  }
}

//   switch (this.state.view.name) {
//     case 'details':
//       return (
//         <div>
//           <Header cartItems={this.state.cart.length}
//             setView={this.setView.bind(this)}/>
//           <ProductDetails
//             id={this.state.view.params.productId}
//             setView={this.setView.bind(this)}
//             addToCart={this.addToCart.bind(this)}/>
//           <Footer />
//         </div>
//       );
//     case 'catalog':
//       return (
//         <div>
//           <Header cartItems={this.state.cart.length}
//             setView={this.setView.bind(this)}/>
//           <ProductList setView={this.setView.bind(this)}/>
//           <Footer />
//         </div>
//       );
//     case 'cart':
//       return (
//         <div>
//           <Header cartItems={this.state.cart.length}
//             setView={this.setView.bind(this)}/>
//           <CartSummary setView={this.setView.bind(this)} cart={this.state.cart}/>
//         </div>
//       );
//     case 'checkout':
//       return (
//         <div>
//           <Header cartItems={this.state.cart.length}
//             setView={this.setView.bind(this)}/>
//           <CheckoutForm
//             setView={this.setView.bind(this)}
//             cart={this.state.cart}
//             placeOrder={this.placeOrder.bind(this)}/>
//           <Footer />
//         </div>
//       );
//   }
// }
