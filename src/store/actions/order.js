import * as actionTypes from "../actions/actionTypes";

export const addProduct = (id, pizza, description, price) => {
  return {
    type: actionTypes.ADD_PRODUCT,
    id: id,
    pizza: pizza,
    description: description,
    price: price,
    quantity: 1,
  };
};

export const removeProduct = (id) => {
  return {
    type: actionTypes.REMOVE_PRODUCT,
    id: id,
  };
};

export const addQuantity = (id) => {
  return {
    type: actionTypes.ADD_QUANTITY,
    id: id,
  };
};

export const removeQuantity = (id) => {
  return {
    type: actionTypes.REMOVE_QUANTITY,
    id: id,
  };
};

export const clearOrder = () => {
  return {
    type: actionTypes.CLEAR_ORDER,
  };
};
