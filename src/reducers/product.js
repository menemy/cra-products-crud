import * as productsActions from '../actions/products';

export function product(state = {}, action) {
  switch (action.type) {
    case productsActions.RECEIVE_PRODUCT:
      return action.product || state;
    default:
      return state;
  }
}
