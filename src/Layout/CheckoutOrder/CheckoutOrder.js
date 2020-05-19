import React from "react";
import { connect } from "react-redux";

import Checkout from "../../components/Checkout/Checkout";
import ModalCheckout from "../../components/Checkout/ModalCheckout/ModalCheckout";
import OrderBasket from "../../components/OrderBasket/OrderBasket";

import Modal from "../../components/UI/Modal/Modal";
import * as actions from "../../store/actions/index";

class CheckoutOrder extends React.Component {
  state = {
    isModal: false,
  };

  showModal = () => {
    this.setState({ isModal: true });
  };

  closeModal = () => {
    this.setState({ isModal: false });
    this.props.history.goBack();
    this.props.onClearOrder();
  };

  render() {
    return (
      <>
        <Checkout orderSent={this.showModal} />
        <OrderBasket {...this.props} />
        <Modal show={this.state.isModal} modalClosed={this.closeModal}>
          <ModalCheckout />
        </Modal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClearOrder: () => dispatch(actions.clearOrder()),
  };
};

export default connect(null, mapDispatchToProps)(CheckoutOrder);
