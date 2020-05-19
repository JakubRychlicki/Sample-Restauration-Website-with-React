import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../share/utility";

const initialState = {
  products: null,
  error: false,
};

const setProducts = (state, action) => {
  return updateObject(state, {
    products: action.products,
  });
};

const fetchProductsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const isAddedProduct = (state, action) => {
  const newProducts = state.products.map((product) =>
    product.id === action.id ? { ...product, added: !product.added } : product
  );
  return updateObject(state, {
    products: newProducts,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      return setProducts(state, action);
    case actionTypes.FETCH_PRODUCTS_FAILED:
      return fetchProductsFailed(state, action);
    case actionTypes.IS_ADDED_PRODUCT:
      return isAddedProduct(state, action);
    default:
      return state;
  }
};

export default reducer;
