import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-products";

export const setProducts = (products) => {
  return {
    type: actionTypes.SET_PRODUCTS,
    products: products,
  };
};

export const fetchProductsFailed = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAILED,
  };
};

export const initProducts = () => {
  return (dispatch) => {
    axios
      .get("https://pepperoni-9a96f.firebaseio.com/products.json")
      .then((response) => {
        dispatch(setProducts(response.data));
      })
      .catch((error) => {
        dispatch(fetchProductsFailed());
      });
  };
};

export const isAddedProduct = (id) => {
  return {
    type: actionTypes.IS_ADDED_PRODUCT,
    id: id,
  };
};
