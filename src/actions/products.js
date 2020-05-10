import { productApi } from '../gateways/ProductApi';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export const REQUEST_PRODUCT = 'REQUEST_PRODUCT';
export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT';

export const REQUEST_CREATE_PRODUCT = 'REQUEST_CREATE_PRODUCT';
export const RECEIVE_CREATE_PRODUCT = 'RECEIVE_CREATE_PRODUCT';

export const REQUEST_DELETE_PRODUCT = 'REQUEST_DELETE_PRODUCT';
export const RECEIVE_DELETE_PRODUCT = 'RECEIVE_DELETE_PRODUCT';

export const REQUEST_UPDATE_PRODUCT = 'REQUEST_UPDATE_PRODUCT';
export const RECEIVE_UPDATE_PRODUCT = 'RECEIVE_UPDATE_PRODUCT';

const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
});

const receiveProducts = (json) => ({
  type: RECEIVE_PRODUCTS,
  products: json.map((product) => product),
});

export const requestCreateProduct = (product) => ({
  type: REQUEST_CREATE_PRODUCT,
  product,
});
export const receiveCreateProduct = (product) => ({
  type: RECEIVE_CREATE_PRODUCT,
  product,
});

export const requestUpdateProduct = (product) => {
  return {
    type: REQUEST_UPDATE_PRODUCT,
    product,
  };
};

export const receiveUpdateProduct = (product) => {
  return {
    type: RECEIVE_UPDATE_PRODUCT,
    product,
  };
};

export const requestDeleteProduct = (id) => {
  return {
    type: REQUEST_DELETE_PRODUCT,
    id,
  };
};

export const receiveDeleteProduct = (id) => {
  return {
    type: RECEIVE_DELETE_PRODUCT,
    id,
  };
};

const requestProduct = () => ({
  type: REQUEST_PRODUCT,
});

const receiveProduct = (product) => ({
  type: RECEIVE_PRODUCT,
  product,
});

export const fetchProducts = () => (dispatch) => {
  dispatch(requestProducts());
  const json = productApi.getProducts();
  dispatch(receiveProducts(json));
  return Promise.resolve({ ok: true });
};

export const fetchProduct = (id) => (dispatch) => {
  dispatch(requestProduct());
  const product = productApi.getProduct(id);
  dispatch(receiveProduct(product));
};

export const deleteProduct = (id) => (dispatch) => {
  dispatch(requestDeleteProduct(id));
  productApi.deleteProduct(id);
  dispatch(receiveDeleteProduct(id));
};

export const updateProduct = (product) => (dispatch) => {
  dispatch(requestUpdateProduct(product));
  const updatedProduct = productApi.updateProduct(product);
  dispatch(receiveUpdateProduct(updatedProduct));
};

export const createProduct = (product) => (dispatch) => {
  dispatch(requestCreateProduct(product));
  const createdProduct = productApi.createProduct(product);
  dispatch(receiveCreateProduct(createdProduct));
};
