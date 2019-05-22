import React, { Component } from 'react';
import '../styles/Cart.css';
import logo from '../images/logo.png';
import CartProduct from './CartProduct'

class Cart extends Component {

  constructor(props){
    super(props);
    this.clearCart = this.clearCart.bind(this);
  }

  clearCart(){
    this.props.clearCart();
  }

  render(){
    let style = this.props.cart.length > 0 ? {display: "none"} : {};

    return(
      <div className="modal" id="cartModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                <img src={logo} className="App-logo" alt="logo" />&nbsp;Tu carrito
              </h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <div className="container">
              { this.props.cart.map((item, i) => (
                <div className="row" key={item.product.id}>
                  <CartProduct item={item} index={i} changeQuantity={this.props.changeQuantity} 
                  erraseProduct={this.props.erraseProduct} />
                </div>
              ))}
                <h5 style={style}>¡Seleccione algún producto de nuestro catálogo para que pueda empezar a comprar!</h5>
              </div>
            </div>
            <div className="modal-footer">
              <div className="">Total: ${this.props.total}</div>
              <button type="button" className="btn btn-danger" 
                onClick={this.clearCart} data-dismiss="modal">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart;