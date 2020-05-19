import React from "react";
import { connect } from "react-redux";

import classes from "./MenuList.module.css";
import Spinner from "../UI/Spinner/Spinner";
import Product from "./Product/Product";

import * as actions from "../../store/actions/index";

class MenuList extends React.Component {
  componentDidMount() {
    if (this.props.orderProducts.length === 0) {
      this.props.onInitProducts();
    }
  }

  render() {
    let menu = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.products) {
      menu = this.props.products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          pizza={product.pizza}
          description={product.description}
          price={product.price}
          added={product.added}
          addProduct={this.props.onAddProduct}
          isAdded={this.props.onAddedProduct}
        />
      ));
    }
    return (
      <div className={classes.Container}>
        <div>
          <h2 className={classes.Title}>Menu</h2>
        </div>
        {menu}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    error: state.products.error,
    orderProducts: state.order.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitProducts: () => dispatch(actions.initProducts()),
    onAddProduct: (id, pizza, description, price) =>
      dispatch(actions.addProduct(id, pizza, description, price)),
    onAddedProduct: (id) => dispatch(actions.isAddedProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
