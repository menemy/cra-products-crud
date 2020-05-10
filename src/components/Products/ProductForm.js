import React, { Component } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
} from 'reactstrap';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import ReactstrapSelect from '../ReactstrapFormikInput/Select';
import ReactstrapInput from '../ReactstrapFormikInput/Input';
import { fetchCategories } from '../../actions/categories';
import {
  createProduct,
  fetchProduct,
  updateProduct,
} from '../../actions/products';

class ProductForm extends Component {
  componentDidMount() {
    const {
      fetchCategoriesDispatch,
      fetchProductDispatch,
      categories,
      match: {
        params: { id },
      },
    } = this.props;
    const productId = parseInt(id, 10) || null;
    if (productId) {
      fetchProductDispatch(productId);
    }
    if (categories.length === 0) {
      fetchCategoriesDispatch();
    }
  }

  render() {
    const {
      categories,
      updateProductDispatch,
      createProductDispatch,
      history,
      match: {
        params: { id },
      },
      product,
    } = this.props;
    const productId = parseInt(id, 10) || null;

    let productData = null;
    if (productId == null) {
      productData = {
        id: '',
        name: '',
        rating: '',
        featured: false,
        itemsInStock: '',
        receiptDate: '',
        brand: '',
        categories: [],
        expirationDate: '',
        createdAt: new Date(),
      };
    } else {
      productData = product;
    }

    return (
      <Container>
        <Link to="/">Back to Home</Link>
        <hr />
        <Col
          md="8"
          style={{
            border: '1px solid rgba(0,0,0,.125)',
            borderRadius: '0.25rem',
            margin: '1rem',
            padding: '1rem',
            backgroundColor: 'white',
          }}
        >
          <h2>{productId ? 'Edit product' : 'Add Product'}</h2>
          <Formik
            enableReinitialize
            initialValues={productData}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .max(200, 'Should be no longer than 200 symbols')
                .required('Required'),
              rating: Yup.number()
                .integer()
                .max(10, 'Should be no shorter than 10 symbols')
                .required('Required'),
              categories: Yup.array()
                .min(1, 'Choose at least one category')
                .max(5, 'Choose no more than five categories'),
              expirationDate: Yup.date()
                .nullable()
                .default(null)
                .min(
                  moment().add(30, 'days'),
                  'Expiration date should be later than month from now or not set',
                ),
            })}
            onSubmit={(values, actions) => {
              if (productId) {
                updateProductDispatch(values);
              } else {
                createProductDispatch(values);
              }
              actions.setSubmitting(false);
              history.push('/');
            }}
          >
            {({
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  type="hidden"
                  label="ID"
                  name="id"
                  id="id"
                  component={ReactstrapInput}
                />
                <Field
                  type="hidden"
                  label="Created At"
                  name="createdAt"
                  id="createdAt"
                  component={ReactstrapInput}
                />
                <FormGroup row>
                  <Col md="12">
                    <Field
                      type="text"
                      label="Name"
                      name="name"
                      description="Required"
                      id="name"
                      component={ReactstrapInput}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="12">
                    <Field
                      type="number"
                      label="Rating"
                      name="rating"
                      id="rating"
                      description="Required"
                      component={ReactstrapInput}
                      onChange={(e) => {
                        handleChange(e);
                        if (e.target.value > 8) {
                          setFieldValue('featured', true);
                        }
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup check style={{ marginBottom: '1.5rem' }}>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="featured"
                      tag={Field}
                      invalid={Boolean(touched.featured && errors.featured)}
                    />{' '}
                    Featured
                  </Label>
                  <FormText>Auto checked if rating greater than eight</FormText>
                  {touched.featured && errors.featured ? (
                    <FormFeedback>{errors.featured}</FormFeedback>
                  ) : (
                    ''
                  )}
                </FormGroup>

                <FormGroup row>
                  <Col md="12">
                    <Field
                      type="number"
                      label="Items In Stock"
                      name="itemsInStock"
                      id="itemsInStock"
                      component={ReactstrapInput}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="12">
                    <Field
                      type="date"
                      label="Receipt Date"
                      name="receiptDate"
                      id="receiptDate"
                      component={ReactstrapInput}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="12">
                    <Field
                      type="text"
                      label="Brand"
                      name="brand"
                      id="brand"
                      component={ReactstrapInput}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="12">
                    <Field
                      label="Categories"
                      name="categories"
                      component={ReactstrapSelect}
                      description="Required, select at least one, no more than five. Use ctrl/cmd for multiple selection"
                      multiple
                      inputprops={{
                        name: 'categories',
                        id: 'categories',
                        options: categories,
                        defaultOption: 'No category',
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="12">
                    <Field
                      type="date"
                      label="Expiration Date"
                      name="expirationDate"
                      id="expirationDate"
                      component={ReactstrapInput}
                    />
                  </Col>
                </FormGroup>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Container>
    );
  }
}

ProductForm.propTypes = {
  match: ReactRouterPropTypes.match,
  history: ReactRouterPropTypes.history.isRequired,
  categories: PropTypes.arrayOf(PropTypes.array).isRequired,
  product: PropTypes.objectOf(PropTypes.object).isRequired,
  fetchCategoriesDispatch: PropTypes.func.isRequired,
  fetchProductDispatch: PropTypes.func.isRequired,
  createProductDispatch: PropTypes.func.isRequired,
  updateProductDispatch: PropTypes.func.isRequired,
};
ProductForm.defaultProps = {
  match: { params: { id: null } },
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  product: state.product,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoriesDispatch: () => dispatch(fetchCategories()),
  fetchProductDispatch: (id) => dispatch(fetchProduct(id)),
  createProductDispatch: (product) => {
    dispatch(createProduct(product));
  },
  updateProductDispatch: (product) => {
    dispatch(updateProduct(product));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ProductForm));
