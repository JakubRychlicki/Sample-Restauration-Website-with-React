import React from "react";
import { connect } from "react-redux";

import Order from "./Order/Order";
import Button from "../UI/Button/Button";
import classes from "./OrderBasket.module.css";

import * as actions from "../../store/actions/index";

const OrderBasket = (props) => {
  const checkoutOrder = () => {
    if (props.isAuthenticated) {
      props.history.push("/checkout");
    } else {
      props.onChangeModalStatus();
    }
  };

  let orders = (
    <div className={classes.CartInfoMessage}>Zamów swoje ulubione danie!</div>
  );

  let isAnyProductAdded = true;
  let overallPrice = 0;

  if (props.orderProducts.length > 0) {
    orders = props.orderProducts.map((product) => {
      return (
        <Order
          key={product.id}
          id={product.id}
          pizza={product.pizza}
          desc={product.description}
          price={product.price}
          quantity={product.quantity}
          removeProduct={props.onRemoveProduct}
          addQuantity={props.onAddQuantity}
          removeQuantity={props.onRemoveQuantity}
          isAdded={props.onAddedProduct}
        />
      );
    });
    overallPrice = props.orderValue.toFixed(2);
    isAnyProductAdded = false;
  }

  let buttonOrder = (
    <div className={classes.ButtonToOrderBox}>
      <Button
        btnType="White"
        disabled={isAnyProductAdded}
        clicked={() => checkoutOrder()}
      >
        <div className={classes.Button}>zamawiam</div>
      </Button>
    </div>
  );

  if (props.history.location.pathname === "/checkout") {
    buttonOrder = null;
  }

  return (
    <div className={classes.Container}>
      <div className={classes.CartBox}>
        <div className={classes.CartTitle}>twoje zamówienie</div>
        <div className={classes.CartOrderBox}>
          {orders}
          <div className={classes.CartOrderpriceBox}>
            <div className={classes.CartOrderpriceName}>Suma:</div>
            <div className={classes.CartOrderpriceValue}>{overallPrice} zł</div>
          </div>
        </div>
        {isAnyProductAdded ? (
          <div className={classes.OrderWarning}>
            Minimalna kwota zamówienia nie została osiągnięta.
          </div>
        ) : null}

        {buttonOrder}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orderProducts: state.order.orders,
    orderValue: state.order.orderValue,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveProduct: (id) => dispatch(actions.removeProduct(id)),
    onAddQuantity: (id) => dispatch(actions.addQuantity(id)),
    onRemoveQuantity: (id, price) =>
      dispatch(actions.removeQuantity(id, price)),
    onAddedProduct: (id) => dispatch(actions.isAddedProduct(id)),
    onChangeModalStatus: () => dispatch(actions.changeModalStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderBasket);
