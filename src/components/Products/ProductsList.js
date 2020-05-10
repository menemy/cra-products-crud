import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'reactstrap';
import { chunk } from 'lodash';
import { withRouter } from 'react-router-dom';
import Product from './Product';

const ProductList = withRouter(({ products, history }) => {
  const productsGroups = chunk(products, 3);

  return (
    <Container>
      <Button
        className="js-add"
        color="success"
        style={{ marginBottom: '1rem' }}
        onClick={() => {
          history.push('/add');
        }}
      >
        Add
      </Button>
      {productsGroups.map((productsGroup, index) => (
        <Row key={String(index)} className="mb-5">
          {productsGroup.map((product) => (
            <Col sm="4" key={product.id} className="js-product">
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
});

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default ProductList;
