import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import ProductsList from './ProductsList';
import { fetchCategories } from '../../actions/categories';
import { fetchProducts } from '../../actions/products';
import { getCategoriesById } from '../../reducers/categories';

class ProductsContainer extends Component {
  componentDidMount() {
    const { dispatch, categories, products } = this.props;

    if (categories.length === 0) {
      dispatch(fetchCategories());
    }

    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }

  render() {
    const { products } = this.props;

    return (
      <Fragment>
        <Header name="Products" />
        <ProductsList products={products} />
      </Fragment>
    );
  }
}

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.array).isRequired,
  categories: PropTypes.arrayOf(PropTypes.array).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const categoriesById = getCategoriesById(state);

  const products = state.products.map((product) => {
    const categories = product.categories.map((id) => categoriesById[id]);

    return {
      ...product,
      categories,
    };
  });

  return {
    products,
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(ProductsContainer);
