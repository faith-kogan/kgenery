import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Components
import SwitchAppResidentialInfo from "./SwitchAppResidentialInfo";
import SwitchAppBusinessInfo from "./SwitchAppBusinessInfo";

// Data
import * as ratesData from "../data/ratesData";

const propTypes = {
  elecDistributors: PropTypes.arrayOf(PropTypes.string).isRequired,
  gasDistributors: PropTypes.arrayOf(PropTypes.string).isRequired,
  customerType: PropTypes.string.isRequired,
  disableGasTab: PropTypes.bool,
  state: PropTypes.string.isRequired,
  showSolar: PropTypes.bool,
  showCC: PropTypes.bool,
  onClickJoinNow: PropTypes.func.isRequired,
};

const defaultProps = {
  disableGasTab: false,
  showSolar: false,
  showCC: false,
};

const defaultAppState = {
  currentType: "electricity",

  // inputs
  elecDistributor: "",
  gasDistributor: "",

  // errors
  errors: {
    distributor: "",
  },

  // Kogan TnC
  terms: "",
};

class SwitchAppResults extends React.Component {
  state = defaultAppState;

  componentDidMount() {
    const { elecDistributors, gasDistributors } = this.props;

    // if there is only one electricity distributor, set as selected distributor
    if (elecDistributors.length === 1) {
      this.handleChange("elecDistributor", elecDistributors[0]);
    }

    // if there is only one gas distributor, set as selected distributor
    if (gasDistributors.length === 1) {
      this.handleChange("gasDistributor", gasDistributors[0]);
    }

    if (!this.doesFormHaveErrors()) {
      setTimeout(function() {
        const $startButton = document.getElementsByClassName('lets-get-started')[0];
        $startButton.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 500);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentType } = this.state;
    const { elecDistributors, gasDistributors, disableGasTab } = this.props;

    // if currentType updated
    if (currentType !== prevState.currentType) {
      // if there is only one electricity distributor
      if (elecDistributors.length === 1) {
        // set as selected distributor
        this.handleChange("elecDistributor", elecDistributors[0]);
      }

      // if there is only one gas distributor, set as selected distributor
      if (gasDistributors.length === 1) {
        // set as selected distributor
        this.handleChange("gasDistributor", gasDistributors[0]);
      }
    }

    // if disableGasTab is updated
    if (disableGasTab !== prevProps.disableGasTab) {
      if (disableGasTab) {
        this.handleChange("currentType", "electricity");
      }
    }
  }

  doesFormHaveErrors = () => {
    const { errors } = this.state;
    return Object.keys(errors).some(key => errors[key].length);
  };

  handleChange = (state, value) => {
    this.setState({
      [state]: value,
    });
  };

  handleTerms = event => {
    const terms = event.target.checked;

    this.setState({ terms });

    if (terms) {
      this.setState({
        errors: {
          ...this.state.errors,
          terms: '',
        },
      });
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          terms: "Please accept the terms and conditions to proceed",
        },
      });
    }
  };

  handleJoinNow = () => {
    if (!this.state.terms) {
      return this.setState({
        errors: {
          ...this.state.errors,
          terms: "Please accept the terms and conditions to proceed",
        },
      })
    }

    if (!this.doesFormHaveErrors()) {
      this.props.onClickJoinNow()
    }
  }

  renderResults = () => {
    const { currentType, elecDistributor, gasDistributor, terms } = this.state;
    const { customerType, state, showSolar, showCC, onClickJoinNow } = this.props;

    // only render when distributor is selected
    // fuel type == electricity
    if (currentType === "electricity" && elecDistributor !== "") {
      return customerType === "residential" ? (
        <SwitchAppResidentialInfo
          rates={ratesData.elecDistributorRatesResidential[elecDistributor]}
          terms={terms}
          handleTerms={this.handleTerms}
          fuelType="electricity"
          distributor={elecDistributor}
          state={state}
          showSolar={showSolar}
          showCC={showCC}
          onClickJoinNow={this.handleJoinNow}
        />
      ) : (
        <SwitchAppBusinessInfo
          rates={ratesData.elecDistributorRatesBusiness[elecDistributor]}
          fuelType="electricity"
          distributor={elecDistributor}
          state={state}
          showSolar={showSolar}
          showCC={showCC}
          onClickJoinNow={this.handleJoinNow}
        />
      );
    }
    // fuel type == gas
    else if (currentType === "gas" && gasDistributor !== "") {
      return customerType === "residential" ? (
        <SwitchAppResidentialInfo
          rates={ratesData.gasDistributorRatesResidential[gasDistributor]}
          terms={terms}
          handleTerms={this.handleTerms}
          fuelType="gas"
          distributor={gasDistributor}
          state={state}
          onClickJoinNow={onClickJoinNow}
        />
      ) : (
        <SwitchAppBusinessInfo
          rates={ratesData.gasDistributorRatesBusiness[gasDistributor]}
          fuelType="gas"
          distributor={gasDistributor}
          state={state}
          onClickJoinNow={onClickJoinNow}
        />
      );
    }

    return null;
  };

  renderDistributors = distributors =>
    distributors.map(distributor => (
      <option value={distributor} key={`distributor-${distributor}`}>
        {distributor}
      </option>
    ));

  render() {
    const { currentType, elecDistributor, gasDistributor, errors } = this.state;
    const { disableGasTab, elecDistributors, gasDistributors } = this.props;

    const distributors =
      currentType === "electricity" ? elecDistributors : gasDistributors;

    const disabledButtonStyle = { opacity: 0.5, cursor: "not-allowed" };

    return (
      <Fragment>
        {/* If there are distributors for both electricity / gas */}
        {elecDistributors.length && gasDistributors.length ? (
          <div className="s-cms-content  c-tabs">
            <ul className="c-tabs__navigation  o-grid-layout  o-grid-layout--columns-2-half-half-mobile">
              <li>
                <button
                  type="button"
                  className={`
                      c-tabs__item
                      ${currentType === "electricity" && "active"}
                    `}
                  onClick={() => {
                    this.handleChange("currentType", "electricity");
                  }}
                >
                  Electricity
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`
                      c-tabs__item
                      ${currentType === "gas" && "active"}
                    `}
                  onClick={() => {
                    this.handleChange("currentType", "gas");
                  }}
                  disabled={disableGasTab}
                  style={disableGasTab ? disabledButtonStyle : null}
                >
                  Gas
                </button>
              </li>
            </ul>
          </div>
        ) : null}
        <div className="c-tabs__content  u-bg-white  u-margin-bottom-zero">
          {/* If have more than one distributor, render distributor dropdown */}
          {distributors.length > 1 && (
            <div className="c-switch-app__inner  u-margin-bottom-tiny">
              <div className="c-input  c-input--centered">
                <label className="c-input-label" htmlFor="distributor">
                  Choose your {currentType} distributor for a more accurate
                  estimate
                </label>
                <select
                  className="c-select"
                  name="distributor"
                  onChange={e =>
                    this.handleChange(
                      currentType === "electricity"
                        ? "elecDistributor"
                        : "gasDistributor",
                      e.target.value
                    )
                  }
                  value={
                    currentType === "electricity"
                      ? elecDistributor
                      : gasDistributor
                  }
                >
                  <Fragment>
                    <option value="">Select a distributor</option>
                    {this.renderDistributors(distributors)}
                  </Fragment>
                </select>
                {errors.distributor && (
                  <small className="c-input__error">{errors.distributor}</small>
                )}
              </div>
            </div>
          )}

          {/* Render rates if distributor is selected */}
          {this.renderResults()}
        </div>
      </Fragment>
    );
  }
}

SwitchAppResults.propTypes = propTypes;
SwitchAppResults.defaultProps = defaultProps;

export default SwitchAppResults;
