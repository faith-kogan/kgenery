import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import { uniq, without } from "lodash";

// Data
import * as calcData from "../data/calcData";
import * as ratesData from "../data/ratesData";

// Components
import LayoutContainer from "../components/LayoutContainer";
import PostcodeEntryField from "../components/PostcodeEntryField";
import ButtonLabel from "../components/kogan/ButtonLabel";
import ButtonIcon from "../components/kogan/ButtonIcon";
import BrandedButton from "../components/kogan/BrandedButton";
import SwitchAppResults from "../components/SwitchAppResults";

// Utils
import * as Utils from "../utils";

// const HOUSEHOLD_OPTIONS = ["Average household", "1 person household", "2-3 person household", "4+ person household"];
// const FREQUENCY_OPTIONS = ["Monthly", "Quarterly", "Yearly"];

const HOUSEHOLD_OPTIONS = [{
  name: "Average household",
  value: "average",
},{
  name: "1 person household",
  value: "one"
},{
  name: "2-3 person household",
  value: "twothree"
},{
  name: "4+ person household",
  value: "four"
}];

const FREQUENCY_OPTIONS = [{
  name: "Monthly",
  value: "monthly",
},{
  name: "Quarterly",
  value: "quarterly"
},{
  name: "Yearly",
  value: "yearly"
}];

const FUEL_TYPE_OPTIONS = [{
  name: "Electricity & Gas",
  value: "dual_fuel",
  fuelType: ["electricity", "gas"]
},{
  name: "Electricity",
  value: "electricity",
  fuelType: ["electricity"]
}];

const defaultAppState = {
  postcode: "",
  customerType: "residential",
  elecDistributors: [],
  gasDistributors: [],
  supportedFuelType: "",
  fuelType: ["electricity"],
  chosenFuelType: FUEL_TYPE_OPTIONS[0].value,
  chosenHouseholdType: HOUSEHOLD_OPTIONS[0].value,
  chosenFrequency: FREQUENCY_OPTIONS[0].value,
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
  
  handleDropdownChange = (state, value) => {
    let { fuelType } = this.state;
    if (state === "chosenFuelType") {
      fuelType = FUEL_TYPE_OPTIONS.find(option => option.value === value).fuelType;
    }
    this.setState({
      [state]: value,
      fuelType,
    });
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

  renderHouseholdOptions = () => (
    HOUSEHOLD_OPTIONS.map(household => (
      <option value={household.value} key={`household-${household.value}`}>
        {household.name}
      </option>
    ))
  );

  renderFrequencyOptions = () => (
    FREQUENCY_OPTIONS.map(frequency => (
      <option value={frequency.value} key={`frequency-${frequency.value}`}>
        {frequency.name}
      </option>
    ))
  );

  renderFuelTypeOptions = () => (
    FUEL_TYPE_OPTIONS.map(fuelType => (
      <option value={fuelType.value} key={`fuelType-${fuelType.value}`}>
        {fuelType.name}
      </option>
    ))
  );

  renderDropdownOptions = () => {
    const {
      fuelType,
      chosenFuelType,
      chosenFrequency,
      chosenHouseholdType,
      hasSolar,
      hasCC,
    } = this.state;

    return (
      <Fragment>
        <div className="c-switch-app-packs-flex">
          <div className="c-input">
            <select
              className="c-select"
              name="household"
              onChange={e =>
                this.handleDropdownChange("chosenHouseholdType", e.target.value)
              }
              value={chosenHouseholdType}
            >
              <Fragment>
                {this.renderHouseholdOptions()}
              </Fragment>
            </select>
          </div>
          <div className="c-input">
            <select
              className="c-select"
              name="frequency"
              onChange={e =>
                this.handleDropdownChange("chosenFrequency", e.target.value)
              }
              value={chosenFrequency}
            >
              <Fragment>
                {this.renderFrequencyOptions()}
              </Fragment>
            </select>
          </div>
          <div className="c-input">
            <select
              className="c-select"
              name="fuelType"
              onChange={e =>
                this.handleDropdownChange("chosenFuelType", e.target.value)
              }
              value={chosenFuelType}
            >
              <Fragment>
                {this.renderFuelTypeOptions()}
              </Fragment>
            </select>
          </div>
        </div>
        <div className="c-switch-app__inner c-checkboxes">
          <div className="c-input">
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
        <div>
          <div className="c-input u-margin-bottom-zero">
            {formSubmitted &&
              errors.customerType && (
                <small className="c-input__error">{errors.customerType}</small>
              )}
            <div className="c-input__separator c-input__separator-border-none" />
          </div>
          {/* remove .o-grid-layout - not sure if you need this */}
          {/* <div className="o-grid-layout "> */}
          <div className="c-switch-app__inner">
            <PostcodeEntryField
              appState={this.state}
              handleChange={this.handlePostcodeChange}
              handleError={this.handlePostcodeError}
              showError={formSubmitted}
              required
            />
          </div>
          <div className="c-input__separator c-input__separator-border-none"></div>
          {/* </div> */}
          {!formNotServiceable && (
            <Fragment>
            {/* start of fuel type and/or solar */}
              {supportedFuelType === "dual_fuel" && (
                <div className="c-input u-margin-bottom-small">
                  {this.renderDropdownOptions()}
                  <div className="c-input__separator c-input__separator-border-none" />
                </div>
              )}
              <div className="c-input__separator c-input__separator-spacing-bottom" />
              {/* end of solar */}
              <center>
                <BrandedButton
                  disabled={formSubmitted && this.doesFormHaveErrors()}
                  onClick={this.validate}>
                  <ButtonLabel text="Let's get started" />
                  <ButtonIcon />
                </BrandedButton>
              </center>
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
      chosenFrequency,
      state,
      fuelType,
      hasSolar,
      hasCC,
    } = this.state;

    return (
      <SwitchAppResults
        elecDistributors={elecDistributors}
        gasDistributors={gasDistributors}
        customerType={customerType}
        chosenFrequency={chosenFrequency}
        disableGasTab={!fuelType.includes("gas")}
        state={state}
        showSolar={hasSolar}
        showCC={hasCC}
        onClickJoinNow={this.handleSubmit}
      />
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
