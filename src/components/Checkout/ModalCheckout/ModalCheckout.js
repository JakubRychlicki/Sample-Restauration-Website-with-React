import React from "react";

import classes from "./ModalCheckout.module.css";
import pizzaImg from "../../../assets/pizza.png";

const ModalCheckout = () => (
  <div className={classes.Container}>
    <h3 className={classes.Title}>ZAMÓWIENIE WYSŁANE</h3>
    <div className={classes.PizzaImg}>
      <img src={pizzaImg} alt="pizza" />
    </div>
    <h4 className={classes.subTitle}>Smacznego !</h4>
  </div>
);

export default ModalCheckout;
