import React from "react";

import classes from "./Order.module.css";
import Button from "../../UI/Button/Button";

const Order = (props) => {
  const {
    id,
    pizza,
    desc,
    price,
    quantity,
    isAdded,
    addQuantity,
    removeQuantity,
    removeProduct,
  } = props;

  let disabledAdd = false;

  if (quantity >= 9) {
    disabledAdd = true;
  }

  const removeType = (quantity) => {
    if (quantity > 1) {
      return removeQuantity(id);
    } else {
      // eslint-disable-next-line
      return removeProduct(id), isAdded(id);
    }
  };

  let overallPrice = (quantity * Number(price)).toFixed(2);

  return (
    <div className={classes.OrderBox}>
      <div className={classes.ControlsBox}>
        <div className={classes.Space}>
          <Button
            btnType="Brown"
            disabled={disabledAdd}
            clicked={() => {
              addQuantity(id);
            }}
          >
            <i className="fas fa-plus"></i>
          </Button>
        </div>
        <div>
          <Button btnType="Brown" clicked={() => removeType(quantity)}>
            <i className="fas fa-minus"></i>
          </Button>
        </div>
      </div>
      <div className={classes.Quantity}>
        <div>{quantity}x</div>
      </div>
      <div className={classes.ProductBox}>
        <div className={classes.ProductName}>{pizza}</div>
        <div className={classes.ProductDesc}>{desc}</div>
      </div>
      <div className={classes.priceBox}>{overallPrice} zł</div>
    </div>
  );
};

export default Order;
