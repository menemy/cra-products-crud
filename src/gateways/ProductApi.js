import products from '../mocks/products';

class ProductApi {
  getProducts = () => {
    return products;
  };

  createProduct = (product) => {
    const createdProduct = {
      ...product,
      id: Math.max(...products.map((o) => o.id)) + 1,
    };
    products.push(createdProduct);
    return createdProduct;
  };

  getProduct = (id) => {
    const index = products.findIndex((product) => product.id === id);
    return products[index];
  };

  updateProduct = (changedProduct) => {
    const index = products.findIndex(
      (product) => product.id === changedProduct.id,
    );
    products[index] = changedProduct;
    return changedProduct;
  };

  deleteProduct = (id) => {
    const index = products.findIndex((product) => product.id === id);
    return products.splice(index, 1);
  };
}

export const productApi = new ProductApi();
