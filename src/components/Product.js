import React, { Component } from 'react';
import '../styles/Product.css'

class Product extends Component {

  constructor(){
    super();
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart(){
    this.props.addToCart(this.props.product);
  }

  render(){
    let flag = this.props.cart.some(item => {
      return this.props.product.id === item.product.id
    });
    let style_cart = flag ? {display: "none"} : {};
    let style = !flag ? {display: "none"} : {}

    return(
      <div className="product-item card">
        <img className="card-img-top" src={require('../images/prodplaceholder.jpg')} alt="card" />
        <div className="card-body">
          <h4 className="card-title"><strong>{this.props.product.name}</strong></h4>
          <hr />
          <p className="card-text">
            <strong>Precio: {this.props.product.price}</strong>
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Stock:</strong> {this.props.product.quantity}</li>
          <li className="list-group-item"><strong>Disponible:</strong> {this.props.product.available ? "Si" : " No"}</li>
        </ul>
        <div className="card-body">
          <div className="card-link" onClick={this.addToCart} style={style_cart}>
            <strong><i className="fas fa-cart-plus"></i>&nbsp; Añadir al carrito</strong>
          </div>
          <p className="product-text" style={style}>Ya en su carrito.</p>
        </div>
      </div>
    )
  }
}

export default Product;