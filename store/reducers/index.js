import { combineReducers } from "redux";
import * as ActionTypes from "../actionTypes";

const initalState = {
  addedProductList: [],
};

const addToCart = (state = initalState, action) => {
  if (!action.payload) return state;

  console.log("state ", state);
  console.log("addToCart");

  const productIndex = state.addedProductList.findIndex(
    (product) => product.id == action.payload.id
  );

  if (productIndex == -1) {
    return {
      ...state,
      addedProductList: [
        ...state.addedProductList,
        { id: action.payload.id, count: 1 },
      ],
    };
  } else {
    return {
      ...state,
      addedProductList: state.addedProductList.map((product) =>
        product.id == action.payload.id
          ? { ...product, count: product.count + 1 }
          : product
      ),
    };
  }
};

const removeFromCart = (state = initalState, action) => {
  if (!action.payload) return state;
  const productIndex = state.addedProductList.findIndex(
    (product) => product.id == action.payload.id
  );
  // console.log("removeFromCart");

  if (productIndex == -1) return state;

  console.log("removeFromCart");

  if (state.addedProductList[productIndex].count == 1) {
    console.log(state.addedProductList);
    const newList = state.addedProductList;
    newList.splice(productIndex, 1);
    console.log(state.addedProductList);
    console.log("newList ", newList);
    return {
      ...state,
      addedProductList: newList,
    };
  } else {
    return {
      ...state,
      addedProductList: state.addedProductList.map((product) =>
        product.id == action.payload.id
          ? { ...product, count: product.count - 1 }
          : product
      ),
    };
  }
};

const commonReducer = (state = initalState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      return addToCart(state, action);
    case ActionTypes.REMOVE_FROM_CART:
      return removeFromCart(state, action);
    case ActionTypes.CLEAR_CART:
      return { ...state, addedProductList: [] };
    default:
      return state;
  }
};

const reducer = combineReducers({
  commonReducer,
});
export default reducer;
