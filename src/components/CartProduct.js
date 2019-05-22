import React, { Component } from 'react';

class CartProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
      product: this.props.item.product,
      quantity: this.props.item.quantity,
      total: 0
    }

    this.quantityHandler = this.quantityHandler.bind(this);
    this.erraseProduct = this.erraseProduct.bind(this);
  }

  quantityHandler(event){
    if (event.target.validity.valid && event.target.value > 0 && event.target.value <= this.state.product.quantity) {
      this.setState(
        { quantity: event.target.value },
        () => this.props.changeQuantity(this.props.index, this.state.quantity)
      );
    }
  }

  erraseProduct(){
    this.props.erraseProduct(this.props.index);
  }

  render(){
    return(
      <React.Fragment>
        <div className="col-4">
          <button type="button" className="close prod" onClick={this.erraseProduct}>&times;&nbsp;&nbsp;</button>
          <input className="form-control" type="number" 
            onChange={this.quantityHandler} value={this.state.quantity} />
        </div>
        <div className="col-8 cart-prod">
          <strong>{ this.state.product.name }</strong>
        </div>
      </React.Fragment>
    )
  }
}

export default CartProduct;