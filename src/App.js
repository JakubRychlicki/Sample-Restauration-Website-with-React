import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import "./App.css";

import * as actions from "./store/actions/index";
import Layout from "./Layout/Layout";

import Main from "./Layout/Main/Main";
import CheckoutOrder from "./Layout/CheckoutOrder/CheckoutOrder";

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.orderProducts.length > 0) {
      routes = (
        <Switch>
          <Route path="/checkout" component={CheckoutOrder} />
          <Route exact path="/" component={Main} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
    orderProducts: state.order.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
