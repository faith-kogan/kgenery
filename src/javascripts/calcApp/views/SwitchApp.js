import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { uniq, without } from "lodash";

// Data
import * as calcData from "../data/calcData";
import * as ratesData from "../data/ratesData";

// Components
import Button from "../components/Button";
import LayoutContainer from "../components/LayoutContainer";
import PostcodeEntryField from "../components/PostcodeEntryField";
import SwitchAppResults from "../components/SwitchAppResults";

// Utils
import * as Utils from "../utils";

const defaultAppState = {
  postcode: "",
  customerType: "residential",
  elecDistributors: [],
  gasDistributors: [],
  supportedFuelType: "",
  fuelType: ["electricity"],
  chosenFuelType: "",
  hasSolar: false,
  hasCC: false,
  state: "",
  promoId: Cookies.get("promo-id"),
  termsUrl: Cookies.get("promo-terms-url"),
  terms: false,
  errors: {
    postcode: "",
    terms: "",
  },
  formSubmitted: false,
  formNotServiceable: false,
};

class SwitchApp extends Component {
  state = defaultAppState;

  // Default state needs to be /
  componentDidMount() {
    const { history } = this.props;

    if (history.location.pathname !== "/") {
      history.push("/");
    }
  }

  getPromoId = () => {
    // changed from powershop implementation - want a promocode if victoria and solar only. 30 july 2021 updated to work with $300 Kogan Energy Offer
    if (this.state.hasCC) return "1002"
    return "1003"

  }

  componentDidUpdate(prevProps, prevState) {
    const { postcode, formNotServiceable, fuelType } = this.state;

    // if postcode updated
    if (prevState.postcode !== postcode) {
      if (postcode.length === 4 && !formNotServiceable) {
        this.handlePostcodeSubmit(postcode);
      } else if (postcode.length < 4 && prevState.postcode.length === 4) {
        this.handleStartAgain();
      }
    }

    // if supportedFuelType change, reset tariff dropdown
    if (prevState.fuelType !== fuelType) {
      this.setChosenFuelType(fuelType);
    }
  }

  setChosenFuelType = fuelType => {
    this.setState({
      chosenFuelType:
        fuelType.includes("electricity") && fuelType.includes("gas")
          ? "dual_fuel"
          : "electricity",
    });
  };

  data = {
    pcodeToDistrib: calcData.pcodeToDistrib,
    pcodeToGasDistrib: calcData.pcodeToGasDistrib,
    elecDistributorRatesResidential: ratesData.elecDistributorRatesResidential,
    elecDistributorRatesBusiness: ratesData.elecDistributorRatesBusiness,
    gasDistributorRatesResidential: ratesData.gasDistributorRatesResidential,
    gasDistributorRatesBusiness: ratesData.gasDistributorRatesBusiness,
    distToState: calcData.distToState,
  };

  fetchValue = (event, state) => {
    const { target } = event;

    if (target.type === "checkbox" && target.name === "fuelType") {
      const current = this.state[state];

      if (target.checked) {
        current.push(target.value);
        return uniq(current);
      }

      return without(current, target.value);
    }

    if (target.type === "checkbox") {
      return target.checked;
    }

    return target.value;
  };

  handleChange = (event, state, callback = () => {}) => {
    const { errors } = this.state;

    this.setState(
      {
        [state]: this.fetchValue(event, state),
        errors: {
          ...errors,
          [state]:
            event.target.type !== "checkbox"
              ? this.validateField(state, event.target.value)
              : "", // checkbox always assumed true
        },
      },
      callback
    );
  };

  validateField = (field, value) => {
    if (!value.length) {
      return "This field is required.";
    }

    return "";
  };

  validate = () => {
    const { customerType, termsUrl, terms } = this.state;

    // Validate our fields
    this.setState(
      {
        errors: {
          customerType: this.validateField("customerType", customerType),
          terms:
            termsUrl && !terms ? "Please agree to the terms to continue" : "",
        },
      },
      this.handleSubmit
    );
  };

  handleStartAgain = () => {
    const { customerType, postcode } = this.state;

    this.setState({
      ...defaultAppState,
      // preserve the following states
      customerType,
      postcode,
    });

    const { history } = this.props;
    if (history.location.pathname === "/info") {
      history.push("/");
    }
  };

  handlePostcodeChange = postcode => {
    this.setState({
      postcode,
      formNotServiceable: false,
    });
  };

  handlePostcodeError = (error, isNotServiceable = false) => {
    const { errors } = this.state;

    this.setState({
      errors: {
        ...errors,
        postcode: error,
      },
      formNotServiceable: isNotServiceable,
    });
  };

  handlePostcodeSubmit = postcode => {
    const elecDistributors = Utils.getDistributors(
      postcode,
      this.data.pcodeToDistrib
    );

    const gasDistributors = Utils.getGasDistributors(
      postcode,
      this.data.pcodeToGasDistrib
    );

    const supportedFuelType = Utils.getFuelType(
      elecDistributors,
      gasDistributors
    );

    const state = this.data.distToState[elecDistributors[0]]; // First match is fine,

    this.setState({
      elecDistributors,
      gasDistributors,
      supportedFuelType,
      state,
      fuelType:
        supportedFuelType === "dual_fuel"
          ? ["electricity", "gas"]
          : ["electricity"],
    });
  };

  doesFormHaveErrors = () => {
    const { errors } = this.state;
    return Object.keys(errors).some(key => errors[key].length);
  };

  hasMatchWithDistributorRate = () => {
    const {
      elecDistributorRatesResidential,
      elecDistributorRatesBusiness,
    } = this.data;
    const { customerType, elecDistributors } = this.state;

    const rates =
      customerType === "residential"
        ? elecDistributorRatesResidential
        : elecDistributorRatesBusiness;

    /* eslint-disable no-prototype-builtins */
    return elecDistributors.some(distributor =>
      rates.hasOwnProperty(distributor)
    );
    /* eslint-enable no-prototype-builtins */
  };

  handleSubmit = () => {
    const { history } = this.props;

    const $startButton = document.getElementsByClassName('lets-get-started')[0];

    if (history.location.pathname === "/") {
      const hasError = this.doesFormHaveErrors();

      setTimeout(function() {
        $startButton.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 500);

      this.setState({ formSubmitted: true, formNotServiceable: false });

      if (!hasError && this.hasMatchWithDistributorRate()) {
        return history.push("/info");
      }
    } else if (history.location.pathname === "/info") {
      const { postcode, chosenFuelType, termsUrl, terms } = this.state;

      if (termsUrl) {
        if (postcode && terms && chosenFuelType) {
          this.submit.click();
        }
      } else if (postcode && chosenFuelType) {
        this.submit.click();
      }
    }

    return true;
  };

  renderFuelTypes = () => {
    const { fuelType } = this.state;

    return (
      <Fragment>
        <div className="c-checkbox">
          <input
            className="c-checkbox__input"
            id="fuel-type-electricity"
            name="fuelType"
            type="checkbox"
            value="electricity"
            onChange={e => this.handleChange(e, "fuelType")}
            checked={fuelType.includes("electricity")}
            disabled
          />
          <label className="c-checkbox__label" htmlFor="fuel-type-electricity">
            Electricity
          </label>
        </div>
        <div className="c-checkbox">
          <input
            className="c-checkbox__input"
            id="fuel-type-gas"
            name="fuelType"
            type="checkbox"
            value="gas"
            onChange={e => this.handleChange(e, "fuelType")}
            checked={fuelType.includes("gas")}
          />
          <label className="c-checkbox__label c-switch-app--gas-label" htmlFor="fuel-type-gas">
            Gas
          </label>
          <p className="gas-note">If you don&apos;t have gas at your property, please unselect gas.</p>
        </div>
      </Fragment>
    );
  };

  renderPostcodeLookup = () => {
    const {
      termsUrl,
      terms,
      errors,
      formSubmitted,
      formNotServiceable,
      supportedFuelType,
      customerType,
      hasSolar,
      hasCC,     // has cc is actually K1 offer (Jan 2022) 
    } = this.state;
    return (
      <Fragment>
        {/* add grid wrapper */}
        <div className="c-switch-app__inner">
          <div className="c-input u-margin-bottom-zero">
            {formSubmitted &&
              errors.customerType && (
                <small className="c-input__error">{errors.customerType}</small>
              )}
            <div className="c-input__separator c-input__separator-border-none" />
          </div>
          {/* remove .o-grid-layout - not sure if you need this */}
          {/* <div className="o-grid-layout "> */}
          <PostcodeEntryField
            appState={this.state}
            handleChange={this.handlePostcodeChange}
            handleError={this.handlePostcodeError}
            showError={formSubmitted}
            required
          />
          <div className="c-input__separator c-input__separator-border-none"></div>
          {/* </div> */}
          {!formNotServiceable && (
            <Fragment>
            {/* start of fuel type and/or solar */}
              {supportedFuelType === "dual_fuel" && (
                <div className="c-input u-margin-bottom-small">
                  <label className="c-input-label" htmlFor="fuelType">
                    Fuel type
                  </label>
                  {this.renderFuelTypes()}
                  <div className="c-input__separator c-input__separator-border-none" />
                </div>
              )}
              <div className="c-input u-margin-bottom-zero">
                <div className="c-checkbox">
                  <input
                    className="c-checkbox__input"
                    id="solar-available"
                    name="hasSolar"
                    type="checkbox"
                    onChange={e => this.handleChange(e, "hasSolar")}
                    checked={hasSolar}
                  />
                  <label
                    className="c-checkbox__label"
                    htmlFor="solar-available"
                  >
                    Yes, I have solar
                  </label>
                  <input
                    className="c-checkbox__input"
                    id="K1-existing"
                    name="hasCC"
                    type="checkbox"
                    onChange={e => this.handleChange(e, "hasCC")}
                    checked={hasCC}
                  />
                  <label
                    className="c-checkbox__label"
                    htmlFor="K1-existing"
                  >
                    I have an existing Kogan First Membership 
                  </label>
                </div>
              </div>
              <div className="c-input__separator c-input__separator-spacing-bottom" />
              {/* end of solar */}
              <Button
                element="button"
                letsGetStarted
                centered
                full
                red
                type="button"
                disabled={formSubmitted && this.doesFormHaveErrors()}
                onClick={this.validate}
              >
                Let's get started
              </Button>
              {formSubmitted &&
                !this.doesFormHaveErrors() &&
                !this.hasMatchWithDistributorRate() && (
                  <small className="c-input__error">
                    No results found. Please try again.
                  </small>
                )}
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  };

  renderInfo = () => {
    const {
      customerType,
      elecDistributors,
      gasDistributors,
      state,
      fuelType,
      hasSolar,
      hasCC,
    } = this.state;

    return (
      <div className="c-form c-form--bordered-dense u-bg-white results">
        <SwitchAppResults
          elecDistributors={elecDistributors}
          gasDistributors={gasDistributors}
          customerType={customerType}
          disableGasTab={!fuelType.includes("gas")}
          state={state}
          showSolar={hasSolar}
          showCC={hasCC}
          onClickJoinNow={this.handleSubmit}
        />
      </div>
    );
  };

  render() {
    const {  chosenFuelType, postcode, terms } = this.state;
    return (
      <LayoutContainer>
        <div className="o-layout__item  u-10/12@tablet">
          <form
            acceptCharset="UTF-8"
            action="https://accounts.koganenergy.com.au/signup/personal_details"
            method="post"
          >
            <input name="promotion_id" type="hidden" value={this.getPromoId(1003)} />
            <input name="signup_type" type="hidden" value={chosenFuelType} />
            <input name="postcode" type="hidden" value={postcode} />
            <input
              name="accept_ts_and_cs"
              type="hidden"
              checked
              readOnly
            />

            <div className="c-form c-form--bordered-dense u-bg-white switch-form">
              {this.renderPostcodeLookup()}
            </div>

            <Switch>
              <Route exact path="/info" render={() => this.renderInfo()} />
            </Switch>
            {/* QA - this hidden submit button is required by Firefox */}
            <input
              type="submit"
              value="submit"
              className="u-hidden-visually"
              ref={c => {
                this.submit = c;
              }}
            />
            {/* QA - this hidden submit button is required by Firefox */}
          </form>
        </div>
      </LayoutContainer>
    );
  }
}

SwitchApp.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withRouter(SwitchApp);
