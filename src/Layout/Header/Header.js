import React from "react";
import { connect } from "react-redux";

import classes from "./Header.module.css";
import * as actions from "../../store/actions/index";

import logo from "../../assets/logo.webp";
import Button from "../../components/UI/Button/Button";

const Header = (props) => {
  const authorization = (isAuthenticated) => {
    if (isAuthenticated) {
      return props.onLogout();
    } else {
      return props.login();
    }
  };
  return (
    <div className={classes.Container}>
      <div className={classes.Box}>
        <div className={classes.Logo}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={classes.BoxHeading}>
          <h2 className={classes.Heading}>pizzeria pepperoni</h2>
        </div>
      </div>
      <div className={classes.LoginBox}>
        <Button
          btnType="White"
          clicked={() => authorization(props.isAuthenticated)}
        >
          <p className={classes.ButtonName}>
            {props.isAuthenticated ? "Wyloguj" : "Zaloguj się"}
          </p>
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
