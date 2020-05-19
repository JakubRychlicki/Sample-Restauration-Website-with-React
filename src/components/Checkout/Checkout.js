import React from "react";

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { updateObject } from "../../share/utility";
import { checkValidity } from "./validation/Validity";

import classes from "./Checkout.module.css";

class Checkout extends React.Component {
  state = {
    personalData: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Imię",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      surname: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nazwisko",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
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
      phone: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Numer telefonu",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    addressData: {
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Miasto",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Ulica",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      nrFlat: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Numer mieszkania",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
  };

  inputChangedHandlerPersonal = (e, controlName) => {
    const updatedControls = updateObject(this.state.personalData, {
      [controlName]: updateObject(this.state.personalData[controlName], {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.personalData[controlName].validation
        ),
        touched: true,
      }),
    });
    this.setState({ personalData: updatedControls });
  };

  inputChangedHandlerAddress = (e, controlName) => {
    const updatedControls = updateObject(this.state.addressData, {
      [controlName]: updateObject(this.state.addressData[controlName], {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.addressData[controlName].validation
        ),
        touched: true,
      }),
    });
    this.setState({ addressData: updatedControls });
  };

  submitHandler = (e) => {
    e.preventDefault();
    if (
      this.state.personalData.name.valid &&
      this.state.personalData.surname.valid &&
      this.state.personalData.email.valid &&
      this.state.personalData.phone.valid &&
      this.state.addressData.city.valid &&
      this.state.addressData.street.valid &&
      this.state.addressData.nrFlat.valid
    ) {
      this.props.orderSent();
    }
  };

  render() {
    const formElementsArrayPersonal = [];
    for (let key in this.state.personalData) {
      formElementsArrayPersonal.push({
        id: key,
        config: this.state.personalData[key],
      });
    }

    const formElementsArrayAddress = [];
    for (let key in this.state.addressData) {
      formElementsArrayAddress.push({
        id: key,
        config: this.state.addressData[key],
      });
    }

    let formPersonal = formElementsArrayPersonal.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        valueType={formElement.id}
        changed={(e) => this.inputChangedHandlerPersonal(e, formElement.id)}
      />
    ));

    let formAddress = formElementsArrayAddress.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        valueType={formElement.id}
        changed={(e) => this.inputChangedHandlerAddress(e, formElement.id)}
      />
    ));

    return (
      <div className={classes.Container}>
        <div className={classes.deliveryTitle}>
          <h2>SPOSÓB DOSTARCZENIA ZAMÓWIENIA</h2>
          <div className={classes.deliveryInfo}>
            <i className="far fa-dot-circle"></i>
            <span className={classes.deliveryText}>Dostawa</span>
          </div>
        </div>
        <form className={classes.formBox}>
          <div className={classes.formPersonalBox}>
            <h3 className={classes.titlePersonal}>TWOJE DANE</h3>
            {formPersonal}
          </div>
          <div className={classes.formAddressBox}>
            <h3 className={classes.titleAddress}>ADRES DOSTAWY</h3>
            {formAddress}
          </div>
        </form>
        <Button clicked={this.submitHandler} btnType="White">
          <div className={classes.orderButton}>ZAMÓW</div>
        </Button>
      </div>
    );
  }
}

export default Checkout;
