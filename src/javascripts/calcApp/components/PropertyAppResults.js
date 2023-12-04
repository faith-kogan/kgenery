import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Components
import PropertyAppResidentialInfo from "./PropertyAppResidentialInfo";
import PropertyAppBusinessInfo from "./PropertyAppBusinessInfo";

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
};

class PropertyAppResults extends React.Component {
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
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentType } = this.state;
    const { elecDistributors, gasDistributors, disableGasTab } = this.props;
    
    const $results = document.getElementsByClassName('results')[0];
    const $form = document.getElementsByClassName('switch-form')[0];

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

    // accordions
    const accordionHeader = document.querySelectorAll('.accordion-header');
      
    accordionHeader.forEach(accordion => {
      accordion.addEventListener('click', (event) => {
        if(accordion.classList.contains('is-active')) {
          accordion.classList.remove('is-active')
        } else {
          accordion.classList.add('is-active')
        }
      })
    })
  }

  handleChange = (state, value) => {
    this.setState({
      [state]: value,
    });
  };

  renderResults = () => {
    const { currentType, elecDistributor, gasDistributor } = this.state;
    const { customerType, state, showSolar, showCC, onClickJoinNow } = this.props;

    // only render when distributor is selected
    // fuel type == electricity
    if (currentType === "electricity" && elecDistributor !== "") {
      return customerType === "residential" ? (
        <PropertyAppResidentialInfo
          rates={ratesData.elecDistributorRatesResidential[elecDistributor]}
          fuelType="electricity"
          distributor={elecDistributor}
          state={state}
          showSolar={showSolar}
          showCC={showCC}
          onClickJoinNow={onClickJoinNow}
        />
      ) : (
      <PropertyAppBusinessInfo
          rates={ratesData.elecDistributorRatesBusiness[elecDistributor]}
          fuelType="electricity"
          distributor={elecDistributor}
          state={state}
          showSolar={showSolar}
          showCC={showCC}
          onClickJoinNow={onClickJoinNow}
        />
      );
    }
    // fuel type == gas
    else if (currentType === "gas" && gasDistributor !== "") {
      return customerType === "residential" ? (
        <PropertyAppResidentialInfo
          rates={ratesData.gasDistributorRatesResidential[gasDistributor]}
          fuelType="gas"
          distributor={gasDistributor}
          state={state}
          onClickJoinNow={onClickJoinNow}
        />
      ) : (
      <PropertyAppBusinessInfo
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
          <div className="s-cms-content c-tabs">
            <ul className="c-tabs__navigation  o-grid-layout  o-grid-layout--columns-2-half-half-mobile">
              <li>
                <button
                  type="button"
                  className={`
                      c-tabs__item
                      c-tabs__item-electricity 
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
                      c-tabs__item-gas
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
            <div>
            <div className="u-text-center">
            <p className="u-font-h5 u-margin-bottom-zero">Looks like we've got {distributors.length} options in your area</p>
            <label className="c-input-label u-margin-bottom-tiny" htmlFor="distributor">
                  Choose your {currentType} distributor for a more accurate
                  estimate
                </label>
            </div>
            <div className="c-switch-app__inner u-margin-bottom-tiny ">
              <div className="c-input  c-input--centered">
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
            </div>
          )}

          {/* Render rates if distributor is selected */}
          {this.renderResults()}
        </div>
      </Fragment>
    );
  }
}

PropertyAppResults.propTypes = propTypes;
PropertyAppResults.defaultProps = defaultProps;

export default PropertyAppResults;
