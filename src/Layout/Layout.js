import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./Header/Header";
import Modal from "../components/UI/Modal/Modal";
import Auth from "../components/Auth/Auth";

import classes from "./Layout.module.css";
import * as actions from "../store/actions/index";

class Layout extends Component {
  render() {
    return (
      <div className={classes.Container}>
        <Header login={this.props.onChangeModalStatus} />
        <div className={classes.Main}>{this.props.children}</div>
        <Modal
          show={this.props.isModalShow}
          modalClosed={this.props.onChangeModalStatus}
        >
          <Auth close={this.props.onChangeModalStatus} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isModalShow: state.auth.isModalShow,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeModalStatus: () => dispatch(actions.changeModalStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
