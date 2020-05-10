import * as productsActions from '../actions/products';

export function products(state = [], action) {
  switch (action.type) {
    case productsActions.RECEIVE_PRODUCTS:
      return [...action.products];
    case productsActions.RECEIVE_CREATE_PRODUCT: {
      return [...state, action.product];
    }

    case productsActions.RECEIVE_UPDATE_PRODUCT: {
      const index = state.findIndex(
        (product) => product.id === action.product.id,
      );
      return [
        ...state.slice(0, index),
        action.product,
        ...state.slice(index + 1),
      ];
    }

    case productsActions.RECEIVE_DELETE_PRODUCT: {
      const index = state.findIndex((product) => product.id === action.id);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1, state.length),
      ];
    }

    default:
      return state;
  }
}
