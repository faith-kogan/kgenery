import React, { Component, Fragment } from "react";

// Components
import Button from "../components/Button";
import LayoutContainer from "../components/LayoutContainer";
import RatesResultsList from "../components/RatesResultsList";
import PostcodeEntryField from "../components/PostcodeEntryFieldVefs";

// Utils
import * as Utils from "../utils";

// Data
import * as calcData from "../data/calcData";
import * as ratesData from "../data/ratesData";

const defaultAppState = () => ({
  ratesForThisPostcode: [],
  postcode: "",
  inputs: {
    customerType: "residential",
    fuelType: "",
    tariffType: "all",
  },
  errors: {
    postcode: "",
    customerType: "",
    fuelType: "",
    tariffType: "",
  },
  formSubmitted: false,
  formNotServiceable: false,
});

class VEFSApp extends Component {
  state = defaultAppState();

  componentDidUpdate(prevProps, prevState) {
    const { inputs } = this.state;

    if (prevState.inputs.fuelType !== inputs.fuelType) {
      this.resetTariffType();
    }

    // if tariffType changed
    if (prevState.inputs.tariffType !== inputs.tariffType) {
      this.resetFormSubmitted();
    }
  }

  data = {
    pcodeToDistrib: calcData.pcodeToDistrib,
    pcodeToGasDistrib: calcData.pcodeToGasDistrib,
    pcodeToClimateZone: calcData.pcodeToClimateZone,
    distToState: calcData.distToState,
    priceRates: ratesData.priceRates,
  };

  handleChange = (event, state, callback = () => {}) => {
    const { inputs, errors } = this.state;

    this.setState(
      {
        inputs: {
          ...inputs,
          [state]: event.target.value,
        },
        errors: {
          ...errors,
          [state]: this.validateField(state, event.target.value),
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
    const { inputs } = this.state;

    // Validate our fields
    const errors = {};
    Object.keys(inputs).forEach(key => {
      errors[key] = this.validateField(key, inputs[key]);
    });

    this.setState({ errors }, this.handleSubmit);
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
      ratesForThisPostcode: [],
      errors: {
        ...errors,
        postcode: error,
      },
      formNotServiceable: isNotServiceable,
    });
  };

  handleSubmit = () => {
    const { postcode, inputs } = this.state;
    const hasError = this.doesFormHaveErrors();

    if (!hasError) {
      const distributors = Utils.getDistributors(
        postcode,
        this.data.pcodeToDistrib
      );
      const gasDistributors = Utils.getGasDistributors(
        postcode,
        this.data.pcodeToGasDistrib
      );
      const climateZone = Utils.getClimateZone(
        postcode,
        this.data.pcodeToClimateZone
      );
      const state = this.data.distToState[distributors[0]]; // First match is fine, it'll resolve to the correct state
      const ratesForThisPostcode = Utils.getRatesItems(
        this.data.priceRates,
        distributors,
        gasDistributors,
        inputs.customerType,
        inputs.fuelType,
        climateZone,
        inputs.tariffType,
        state
      );

      this.setState(
        {
          formSubmitted: true,
          formNotServiceable: false,
        },
        () => {
          // leave this here because it won't update if its not here
          this.setState({
            ratesForThisPostcode,
          });
        }
      );

      return true;
    }

    this.setState({
      formSubmitted: true,
      formNotServiceable: false,
    });

    return false;
  };

  doesFormHaveErrors = () => {
    const { errors } = this.state;
    return Object.keys(errors).some(key => errors[key].length);
  };

  resetTariffType = () => {
    const { inputs } = this.state;

    this.setState({
      inputs: {
        ...inputs,
        tariffType: "all",
      },
    });
  };

  resetFormSubmitted = () => {
    this.setState({
      formSubmitted: false,
    });
  };

  renderTariffTypes = () => {
    const { inputs } = this.state;

    if (inputs.fuelType === "electricity") {
      return Object.keys(calcData.tariffTypesElectricity).map(value => (
        <option value={value} key={`tariff-electricity-${value}`}>
          {calcData.tariffTypesElectricity[value]}
        </option>
      ));
    } else if (inputs.fuelType === "gas") {
      return Object.keys(calcData.tariffTypesGas).map(value => (
        <option value={value} key={`tariff-gas-${value}`}>
          {calcData.tariffTypesGas[value]}
        </option>
      ));
    }

    return null;
  };

  render() {
    const { state } = this;

    return (
      <Fragment>
        <LayoutContainer>
          <div className="o-layout__item  u-10/12@tablet  u-7/12@desktop  u-6/12@large  u-5/12@wide">
            <form
              className="c-form c-form--bordered-dense"
              onSubmit={e => {
                e.preventDefault();
                this.validate();
              }}
            >
              <PostcodeEntryField
                appState={state}
                handleChange={this.handlePostcodeChange}
                handleError={this.handlePostcodeError}
                showError={state.formSubmitted}
                climateZoneOnly
                required
              />
              {!state.formNotServiceable && (
                <Fragment>
                  <div className="c-input">
                    <label className="c-input-label" htmlFor="fuelType">
                      Fuel type (required)
                    </label>
                    <div className="c-radio">
                      <input
                        className="c-radio__input"
                        type="radio"
                        name="fuelType"
                        value="electricity"
                        id="fuel-type-electricity"
                        onChange={e => this.handleChange(e, "fuelType")}
                      />
                      <label
                        className="c-radio__label"
                        htmlFor="fuel-type-electricity"
                      >
                        Electricity
                      </label>
                    </div>
                    <div className="c-radio">
                      <input
                        className="c-radio__input"
                        type="radio"
                        name="fuelType"
                        value="gas"
                        id="fuel-type-gas"
                        onChange={e => this.handleChange(e, "fuelType")}
                      />
                      <label className="c-radio__label" htmlFor="fuel-type-gas">
                        Gas
                      </label>
                    </div>
                    {state.formSubmitted &&
                      state.errors.fuelType && (
                        <small className="c-input__error">
                          {state.errors.fuelType}
                        </small>
                      )}
                    <div className="c-input__separator" />
                  </div>
                  <div className="c-input">
                    <label className="c-input-label" htmlFor="tariffType">
                      Tariff type (required)
                    </label>
                    <select
                      className="c-select"
                      name="tariffType"
                      onChange={e => this.handleChange(e, "tariffType")}
                    >
                      <Fragment>
                        <option value="all">Not Sure / Show me all</option>
                        {this.renderTariffTypes()}
                      </Fragment>
                    </select>
                    {state.formSubmitted &&
                      state.errors.tariffType && (
                        <small className="c-input__error">
                          {state.errors.tariffType}
                        </small>
                      )}
                    <div className="c-input__separator" />
                  </div>
                  <Button
                    element="button"
                    centered
                    full
                    red
                    type="submit"
                    disabled={state.formSubmitted && this.doesFormHaveErrors()}
                  >
                    View Energy Fact Sheets
                  </Button>
                  {state.formSubmitted &&
                    this.doesFormHaveErrors() && (
                      <small className="c-input__error">
                        There are form errors. Please check and try again.
                      </small>
                    )}
                  {state.formSubmitted &&
                    !this.doesFormHaveErrors() &&
                    state.ratesForThisPostcode.length === 0 && (
                      <small className="c-input__error">
                        No result found. Please try again.
                      </small>
                    )}
                </Fragment>
              )}
            </form>
          </div>
        </LayoutContainer>
        {state.ratesForThisPostcode.length > 0 && (
          <RatesResultsList
            label="Results"
            group={state.ratesForThisPostcode}
          />
        )}
      </Fragment>
    );
  }
}

export default VEFSApp;
