import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import { checkValidity } from "./validation/Validity";
import { updateObject } from "../../share/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Hasło",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: false,
  };

  resetForm = () => {
    const clearControls = updateObject(this.state.controls, {
      email: updateObject(this.state.controls.email, {
        value: "",
        touched: false,
        valid: false,
      }),
      password: updateObject(this.state.controls.password, {
        value: "",
        touched: false,
        valid: false,
      }),
    });
    this.setState({ controls: clearControls });
  };

  inputChangedHandler = (e, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
    this.resetForm();
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        valueType={formElement.id}
        changed={(e) => this.inputChangedHandler(e, formElement.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.Container}>
        <button
          className={classes.buttonClose}
          onClick={() => this.props.close()}
        >
          <div className={classes.close}>
            <i className="fas fa-times"></i>
          </div>
        </button>
        <h2 className={classes.TitleLogin}>
          {this.state.isSignup ? "Rejestrowanie" : "Logowanie"}
        </h2>
        <form className={classes.FormBox}>
          {form}
          <Button clicked={this.submitHandler} btnType="White">
            <div className={classes.ButtonSubmit}>
              {this.state.isSignup ? "Zarejestruj się" : "Zaloguj się"}
            </div>
          </Button>
        </form>
        {this.state.isSignup ? (
          <div className={classes.RegistrationBox}>
            Masz konto?{" "}
            <Button btnType="Brown" clicked={this.switchAuthModeHandler}>
              Zaloguj się
            </Button>
          </div>
        ) : (
          <div className={classes.RegistrationBox}>
            Nie masz jeszcze konta?{" "}
            <Button btnType="Brown" clicked={this.switchAuthModeHandler}>
              Zarejestruj się
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
