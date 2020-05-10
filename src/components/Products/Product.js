import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Button,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import ReactRouterPropTypes from 'react-router-prop-types';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProduct } from '../../actions/products';

const shortDateFormat = 'MM/DD/YYYY';
const longDateFormat = 'MM/DD/YYYY hh:mm a';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModalVisible: false,
    };
  }

  toggleDeleteModal = () => {
    const { deleteModalVisible } = this.state;
    this.setState({
      deleteModalVisible: !deleteModalVisible,
    });
  };

  render() {
    const { product, history, deleteProductDispatch } = this.props;
    const { deleteModalVisible } = this.state;
    const receiptDate = product.receiptDate
      ? moment(product.receiptDate).format(shortDateFormat)
      : '-';
    const expirationDate = product.expirationDate
      ? moment(product.expirationDate).format(shortDateFormat)
      : '-';
    const createdAt = product.createdAt
      ? moment(product.createdAt).format(longDateFormat)
      : '-';

    return (
      <Card>
        <CardHeader className="text-center">
          <ButtonGroup size="sm">
            <Button
              color="info"
              className="js-edit"
              onClick={() => {
                history.push(`/edit/${product.id}`);
              }}
            >
              Edit
            </Button>
            <Button
              color="danger"
              className="js-delete-product"
              onClick={this.toggleDeleteModal}
            >
              Delete
            </Button>
            <Modal isOpen={deleteModalVisible} toggle={this.toggleDeleteModal}>
              <ModalBody>
                Are you sure you want to delete the product{' '}
                <strong>{product.name}</strong>?
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  className="js-delete-modal-confirm"
                  onClick={() => {
                    this.toggleDeleteModal();
                    deleteProductDispatch(product.id);
                  }}
                >
                  Delete
                </Button>{' '}
                <Button color="secondary" onClick={this.toggleDeleteModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </ButtonGroup>
        </CardHeader>
        <CardBody>
          <CardTitle className="js-card-name">{product.name}</CardTitle>
          <CardText tag="div">
            <ListGroup>
              <ListGroupItem>Brand: {product.brand}</ListGroupItem>
              <ListGroupItem>Rating: {product.rating}</ListGroupItem>
              <ListGroupItem>
                Featured: {product.featured ? 'Yes' : 'No'}
              </ListGroupItem>
              <ListGroupItem>
                Items In Stock: {product.itemsInStock}
              </ListGroupItem>
              <ListGroupItem>
                Categories:
                <ul>
                  {product.categories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                  ))}
                </ul>
              </ListGroupItem>
              <ListGroupItem>Receipt Date: {receiptDate}</ListGroupItem>
              <ListGroupItem>Expiration Date: {expirationDate}</ListGroupItem>
              <ListGroupItem>Created At: {createdAt}</ListGroupItem>
            </ListGroup>
          </CardText>
        </CardBody>
      </Card>
    );
  }
}
Product.propTypes = {
  product: PropTypes.objectOf(PropTypes.object).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  deleteProductDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteProductDispatch: (id) => dispatch(deleteProduct(id)),
});

export default connect(null, mapDispatchToProps)(withRouter(Product));
