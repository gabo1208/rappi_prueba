import React, { Component } from 'react';
import logo from './images/logo.png';
import userpic from './images/userimage.png'
import './styles/App.css';
import Catalog from './components/Catalog'
import Cart from './components/Cart'

class App extends Component {
  constructor(){
    super();
    let cart = localStorage.hasOwnProperty('cart') ?
      JSON.parse(localStorage.getItem('cart')) : []

    this.state = {
      filter_str: '',
      cart: cart,
      total: this.sumTotal(cart)
    }

    this.filterString = this.filterString.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.erraseProduct = this.erraseProduct.bind(this);
  }

  filterString(event){
    this.setState({filter_str: event.target.value.toLowerCase()});
  }

  clearCart(){
    localStorage.clear();
    this.setState({
      filter_str: this.state.filter_str,
      cart: [],
      total: 0
    });
  }

  addToCart(product){
    let new_cart = this.state.cart;
    if(!new_cart.some(item => {
        return item.product.id === product.id
      })){
        new_cart.push({
          product: product,
          quantity: 1
        });

        this.setState(
          {
            cart: new_cart,
            total: this.sumTotal(new_cart)
          },
          () => this.updateLocalStorage()
        );
    }
  }

  changeQuantity(i, quantity){
    let new_cart = []
    this.state.cart.forEach((item, index) => {
      if(index === i){
        let new_item = {
          product: item.product,
          quantity: quantity
        }
        new_cart.push(new_item);
      }else{
        new_cart.push(item);
      }
    })

    this.setState(
      {
        cart: new_cart,
        total: this.sumTotal(new_cart)
      },
      () => this.updateLocalStorage()
    );
  }

  sumTotal(array){
    let total = array.reduce(function(total, item){
      return total + parseFloat(item.product.price.slice(1).replace(',', ''))*item.quantity
    }, 0).toString().split('.');
    total[0] = total[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return total.join(".");
  }

  erraseProduct(i){
    let new_cart = []
    this.state.cart.forEach((item, index) => {
      if(index !== i){
        new_cart.push(item);
      }
    })
    
    this.setState(
      {
        cart: new_cart,
        total: this.sumTotal(new_cart)
      },
      () => this.updateLocalStorage()
    );
  }

  updateLocalStorage(){
    localStorage.setItem(
      'cart',
      JSON.stringify(this.state.cart)
    )
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={userpic} className="pull-left-pic user-pic" alt="user-pic"/>
          <p className="store-name">
            <strong>
              Tiendas El &nbsp;<img src={logo} className="App-logo" alt="logo"/>aratón
            </strong>
          </p>
          <div className="search-field">
            <input type="text" className="form-control form-control-lg"
              placeholder="Search" onChange={this.filterString}/>
            </div>
          <div className="pull-right-cart">
            <i data-toggle="modal" data-target="#cartModal" className="fas fa-shopping-cart"></i>
          </div>
        </header>
        
        <Catalog filterString={this.state.filter_str} cart={this.state.cart} addToCart={this.addToCart} />

        <Cart cart={this.state.cart} clearCart={this.clearCart} changeQuantity={this.changeQuantity}
          total={this.state.total} erraseProduct={this.erraseProduct} />
      </div>
    )
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }
}

export default App;
