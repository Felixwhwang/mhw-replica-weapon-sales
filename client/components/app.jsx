import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotificationModal from './notification-modal';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
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

  removeItem(cartItemId) {
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItemId)
    };
    fetch('/api/cart', req)
      .then(res => res.json())
      .then(cartItemId => {
        const { cart } = this.state;
        for (let index = 0; index < cart.length; index++) {
          if (cart[index].cartItemId === cartItemId) {
            cart.splice(index, 1);
            break;
          }
        }
        this.setState({ cart });
      }).catch(err => alert('removeItem error', err));
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
        let checkItemExist = false;
        const cart = this.state.cart.map(cur => {
          if (item.productId === cur.productId) {
            cur.quantity = item.quantity;
            checkItemExist = true;
          }
          return cur;
        });
        if (checkItemExist) {
          this.setState({ cart });
        } else {
          this.setState({ cart: this.state.cart.concat(item) });
        }
      }).catch(err => alert('addToCart error', err));
  }

  render() {
    return (
      <Router>
        <Header cartItems={this.state.cart} />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/item"
            render={props => <ProductDetails {...props}
              addToCart={this.addToCart.bind(this)} />} />
          <Route path="/cart"
            render={props => <CartSummary {...props}
              cart={this.state.cart}
              removeItem={this.removeItem.bind(this)} />} />
          <Route path="/checkout"
            render={props => <CheckoutForm {...props}
              cart={this.state.cart}
              placeOrder={this.placeOrder.bind(this)} />} />
          <Route path="/" render={() => <div>error</div>} />
        </Switch>
        <NotificationModal />
      </Router>
    );
  }
}
