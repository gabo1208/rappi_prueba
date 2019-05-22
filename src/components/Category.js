import React, { Component } from 'react';

class Category extends Component {

  constructor(){
    super();
    this.catHandler = this.catHandler.bind(this);
  } 

  catHandler(){
    this.props.categoryHandler(this.props.category.id);
  }
  
  render() {
    let style = this.props.currentId === this.props.category.id ? {opacity: "0.8"} : {};

    if(this.props.category.sublevels){
      return(
        <React.Fragment>
          <div className="categories-menu-item" data-toggle="collapse" style={style}
            data-target={"#" + this.props.category.name} onClick={this.catHandler}>
            { this.props.category.name }
          </div>
          <div className="categories-menu-item collapse" id={this.props.category.name}>
            { this.props.category.sublevels.map(subcategory => (
            <div key={ subcategory.name }>
              <Category category={subcategory} categoryHandler={this.props.categoryHandler}
               currentId={this.props.currentId} />
            </div>
          ))}  
          </div>
        </React.Fragment>
      )
    }else{
      return(
        <div className="categories-menu-item" onClick={this.catHandler} style={style}>
          { this.props.category.name }
        </div>
      )
    }
  }
}

export default Category;