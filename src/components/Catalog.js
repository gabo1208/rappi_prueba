import React, { Component } from 'react';
import products_data from './products.json'
import categories_data from './categories.json'
import '../styles/Catalog.css';
import Category from './Category'
import Product from './Product'

class Catalog extends Component {

  constructor() {
    super()
    // This would be replaced by an API call on componentDidMount using fetch
    let max = Math.max.apply(Math, products_data['products'].map(function(product){
      return parseFloat(product.price.slice(1).replace(',', ''));
    }));

    this.state = {
      categories: categories_data['categories'],
      products: products_data['products'],
      value: max,
      range_value: this.numberToString(max),
      filter_available: false,
      filter_quantity: false,
      filter_value: false,
      order_value_asc: false,
      order_value_desc: false,
      order_available: false,
      order_quantity_asc: false,
      order_quantity_desc: false,
      current_category_id: 1,
      max_value: max,
      filtered_products: products_data['products'].filter(function(product){
        return product.sublevel_id === 1;
      }),
      search_str: ''
    }

    this.rangeHandler = this.rangeHandler.bind(this);
    this.filterAvailableHandler = this.filterAvailableHandler.bind(this);
    this.filterQuantityHandler = this.filterQuantityHandler.bind(this);
    this.filterValueHandler = this.filterValueHandler.bind(this);
    this.orderValueAscHandler = this.orderValueAscHandler.bind(this);
    this.orderValueDescHandler = this.orderValueDescHandler.bind(this);
    this.orderAvailableHandler = this.orderAvailableHandler.bind(this);
    this.orderQuantityAscHandler = this.orderQuantityAscHandler.bind(this);
    this.orderQuantityDescHandler = this.orderQuantityDescHandler.bind(this);
    this.categoryHandler = this.categoryHandler.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
  }

  rangeHandler(event){
    this.setState(
      {
        value: event.target.value,
        range_value: this.numberToString(event.target.value)
      },
      () => this.filterProducts()
    );
  }

  numberToString(number){
    let str = number.toString().split('.');
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }

  filterAvailableHandler(){
    this.setState(
      {filter_available: !this.state.filter_available},
      () => this.filterProducts()
    );
  }

  filterQuantityHandler(){
    this.setState(
      {filter_quantity: !this.state.filter_quantity},
      () => this.filterProducts()
    );
  }

  filterValueHandler(){
    this.setState(
      {filter_value: !this.state.filter_value},
      () => this.filterProducts()
    );
  }

  orderValueAscHandler(){
    this.setState({
        order_value_asc: !this.state.order_value_asc,
        order_value_desc: false,
        order_available: false,
        order_quantity_asc: false,
        order_quantity_desc: false
      },
      () => this.filterProducts()
    );
  }

  orderValueDescHandler(){
    this.setState({
        order_value_asc: false,
        order_value_desc: !this.state.order_value_desc,
        order_available: false,
        order_quantity_asc: false,
        order_quantity_desc: false
      },
      () => this.filterProducts()
    );
  }

  orderAvailableHandler(){
    this.setState({
        order_value_asc: false,
        order_value_desc: false,
        order_available: !this.state.order_available,
        order_quantity_asc: false,
        order_quantity_desc: false
      },
      () => this.filterProducts()
    );
  }

  orderQuantityAscHandler(){
    this.setState({
        order_value_asc: false,
        order_value_desc: false,
        order_available: false,
        order_quantity_asc: !this.state.order_quantity_asc,
        order_quantity_desc: false
      },
      () => this.filterProducts()
    );
  }

  orderQuantityDescHandler(){
    this.setState({
        order_value_asc: false,
        order_value_desc: false,
        order_available: false,
        order_quantity_asc: false,
        order_quantity_desc: !this.state.order_quantity_desc
      },
      () => this.filterProducts()
    );
  }

  categoryHandler(value){
    this.setState(
      {current_category_id: value},
      () => this.filterProducts()
    );
  }

  filterProducts(){
    let state = this.state;
    let products = this.state.products;
    products = this.state.products.filter(function(product){
      if(state.current_category_id !== product.sublevel_id){
        return false;
      }

      if(state.filter_quantity && product.quantity === 0){
        return false;
      }

      if(state.filter_available && !product.available){
        return false;
      }

      if(state.filter_value && (parseFloat(product.price.slice(1).replace(',','')) > state.value)){
        return false;
      }

      return true;
    })

    if(state.order_value_asc){
      products.sort(function(a, b){
        return parseFloat(a.price.slice(1).replace(',', '')) - parseFloat(b.price.slice(1).replace(',', ''));
      })
    }else if(state.order_value_desc){
      products.sort(function(a, b){
        return -(parseFloat(a.price.slice(1).replace(',', '')) - parseFloat(b.price.slice(1).replace(',', '')));
      })
    }else if(state.order_quantity_asc){
      products.sort(function(a, b){
        return a.quantity - b.quantity;
      })
    }else if(state.order_quantity_desc){
      products.sort(function(a, b){
        return -(a.quantity - b.quantity);
      })
    }else if(state.order_available){
      products.sort(function(a, b){
        return -((a.available ? 1 : 0) - (b.available ? 1: 0))
      })
    }

    this.setState({
      filtered_products: products
    })
  }

  render() {
    let filter_str = this.props.filterString;

    return(
      <div className="content-container">
        <div className="categories-menu">
          { this.state.categories.map(category => (
            <div key={ category.name } >
              <Category category={category} categoryHandler={this.categoryHandler} />
            </div>
          )) }
          <br />
          <div className="categories-menu-item">
            <h4>Ordenar por:</h4>
              <div className="price-range-selector">
                <h5 onClick={this.orderValueDescHandler}>
                  <input readOnly type="checkbox" checked={this.state.order_value_desc}/>
                  &nbsp;&nbsp;Precio Desc.
                </h5>
                <h5 onClick={this.orderValueAscHandler}>
                  <input readOnly type="checkbox" checked={this.state.order_value_asc}/>
                  &nbsp;&nbsp;Precio Asc.
                </h5>
                <h5 onClick={this.orderQuantityDescHandler}>
                  <input readOnly type="checkbox" checked={this.state.order_quantity_desc}/>
                  &nbsp;&nbsp;Stock Desc.
                </h5>
                <h5 onClick={this.orderQuantityAscHandler}>
                  <input readOnly type="checkbox" checked={this.state.order_quantity_asc}/>
                  &nbsp;&nbsp;Stock Asc.
                </h5>
                <h5 onClick={this.orderAvailableHandler}>
                  <input readOnly type="checkbox" checked={this.state.order_available}/>
                  &nbsp;&nbsp;Disponible 
                </h5>
              </div>
          </div>
          <br />
          <div className="categories-menu-item">
            <h4> Filtrar por:</h4>
            <div className="price-range-selector">
              <h5 onClick={this.filterAvailableHandler}>
                <input readOnly type="checkbox" checked={this.state.filter_available}/>
                &nbsp;&nbsp;Disponible
              </h5>
              <h5 onClick={this.filterQuantityHandler}>
                <input readOnly type="checkbox" checked={this.state.filter_quantity}/>
                &nbsp;&nbsp;En Stock
              </h5>
              <h5 onClick={this.filterValueHandler}>
                <input readOnly type="checkbox" checked={this.state.filter_value}/>
                &nbsp;&nbsp;Rango de precio
              </h5>
              <div style={this.state.filter_value ? {} : {display: 'none'}}>
                <input type="range" min="0" max={this.state.max_value} value={this.state.value}
                  className="slider-color" onChange={this.rangeHandler}/>
                  <p>${this.state.range_value} mil</p>
                </div>
            </div>
          </div>
        </div>
        <div className="products-container container">
          <div className="row">
            {this.state.filtered_products.filter(
              function(product){
                return (filter_str !== '' ? product.name.toLowerCase().search(
                  filter_str) !== -1 : true)
              }).map(product => (
                <div key={product.id} className="product-row col-12 col-md-3 col-xl-2">
                  <Product product={product} cart={this.props.cart} addToCart={this.props.addToCart} />
                </div>
              ))
            }
            <div className="col">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Catalog;