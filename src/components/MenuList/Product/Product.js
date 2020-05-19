import React from "react";

import classes from "./Product.module.css";

const Product = (props) => {
  const { id, pizza, description, price, added, isAdded, addProduct } = props;

  return (
    <div className={classes.Container}>
      <div className={classes.boxDesc}>
        <h2 className={classes.pizzaText}>{pizza}</h2>
        <h4 className={classes.descriptionText}>{description}</h4>
      </div>
      <div className={classes.box}>
        <div className={classes.priceBox}>
          <h3>{price} zł</h3>
        </div>
        <button
          className={classes.buttonPlus}
          onClick={() => {
            addProduct(id, pizza, description, price);
            isAdded(id);
          }}
          disabled={added}
        >
          <div className={classes.plus}>
            <i className="fas fa-plus"></i>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Product;
