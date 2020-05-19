import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../share/utility";

const initialState = {
  orders: [],
  orderValue: 0,
};

const addProduct = (state, action) => {
  const product = {
    id: action.id,
    pizza: action.pizza,
    description: action.description,
    price: action.price,
    quantity: action.quantity,
  };
  return updateObject(state, {
    orders: state.orders.concat(product),
    orderValue: state.orderValue + Number(action.price),
  });
};

const removeProduct = (state, action) => {
  const newProducts = state.orders.filter((product) => {
    return product.id !== action.id;
  });
  let productIndexDeleted = state.orders.findIndex(
    (product) => product.id === action.id
  );
  let priceToDelete = Number(state.orders[productIndexDeleted].price);
  return updateObject(state, {
    orders: newProducts,
    orderValue: state.orderValue - priceToDelete,
  });
};

const addQuantity = (state, action) => {
  const newOrders = state.orders.map((product) =>
    product.id === action.id
      ? { ...product, quantity: product.quantity + 1 }
      : product
  );
  let productIndexAdd = state.orders.findIndex(
    (product) => product.id === action.id
  );
  let priceToAdd = Number(state.orders[productIndexAdd].price);
  return updateObject(state, {
    orders: newOrders,
    orderValue: state.orderValue + priceToAdd,
  });
};

const removeQuantity = (state, action) => {
  const neworders = state.orders.map((product) =>
    product.id === action.id
      ? { ...product, quantity: product.quantity - 1 }
      : product
  );
  let productIndexRemove = state.orders.findIndex(
    (product) => product.id === action.id
  );
  let priceToRemove = Number(state.orders[productIndexRemove].price);
  return updateObject(state, {
    orders: neworders,
    orderValue: state.orderValue - priceToRemove,
  });
};

const clearOrder = (state, action) => {
  return updateObject(state, { orders: [], orderValue: 0 });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT:
      return addProduct(state, action);
    case actionTypes.REMOVE_PRODUCT:
      return removeProduct(state, action);
    case actionTypes.ADD_QUANTITY:
      return addQuantity(state, action);
    case actionTypes.REMOVE_QUANTITY:
      return removeQuantity(state, action);
    case actionTypes.CLEAR_ORDER:
      return clearOrder(state, action);
    default:
      return state;
  }
};

export default reducer;
