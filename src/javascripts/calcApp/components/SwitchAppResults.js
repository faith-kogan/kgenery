import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Components
import SwitchAppResidentialInfo from "./SwitchAppResidentialInfo";
import SwitchAppBusinessInfo from "./SwitchAppBusinessInfo";
import SwitchAppResidentialSummarizedInfo from "./SwitchAppResidentialSummarizedInfo";
import ButtonLabel from "../components/kogan/ButtonLabel";
import ButtonIcon from "../components/kogan/ButtonIcon";
import BrandedButton from "../components/kogan/BrandedButton";

// Data
import * as ratesData from "../data/ratesData";
import * as calcData from "../data/calcData";

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

    this.getCheapestElectricityDistributor(elecDistributors)
    this.getCheapestGasDistributor(gasDistributors)

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
      this.getCheapestElectricityDistributor(elecDistributors)
      this.getCheapestGasDistributor(gasDistributors)
    }

    // if disableGasTab is updated
    if (disableGasTab !== prevProps.disableGasTab) {
      if (disableGasTab) {
        this.handleChange("currentType", "electricity");
      }
    }
  }

  getCheapestElectricityDistributor = (elecDistributors) => {
    // if there is only one electricity distributor
    if (elecDistributors.length === 1) {
      // set as selected distributor
      this.handleChange("elecDistributor", elecDistributors[0]);
      return
    }
    if (elecDistributors.length === 0) return
    const { customerType } = this.props;
    let elecDistributorRates = (customerType === "residential") ? ratesData.elecDistributorRatesResidential : ratesData.elecDistributorRatesBusiness;
    const filteredData = Object.keys(elecDistributorRates)
      .filter(key => elecDistributors.includes(key))
      .reduce((result, key) => {
        result[key] = elecDistributorRates[key];
        return result;
      }, {});
    const cheapestKey = Object.keys(filteredData).reduce((minKey, currentKey) => {
      const currentAnnualSpend = parseInt(filteredData[currentKey].averageSpend.replace(/\D/g, ''), 10);
      const minAnnualSpend = parseInt(filteredData[minKey].averageSpend.replace(/\D/g, ''), 10);
    
      return currentAnnualSpend < minAnnualSpend ? currentKey : minKey;
    }, elecDistributors[0]);
    
    this.handleChange("elecDistributor", cheapestKey);
  }

  getCheapestGasDistributor = (gasDistributors) => {
    // if there is only one gas distributor, set as selected distributor
    if (gasDistributors.length === 1) {
      // set as selected distributor
      this.handleChange("gasDistributor", gasDistributors[0]);
      return
    }
    if (gasDistributors.length === 0) return

    const { customerType } = this.props;
    let gasDistributorRates = (customerType === "residential") ? ratesData.gasDistributorRatesResidential : ratesData.gasDistributorRatesBusiness;
    const filteredData = Object.keys(gasDistributorRates)
      .filter(key => gasDistributors.includes(key))
      .reduce((result, key) => {
        result[key] = gasDistributorRates[key];
        return result;
      }, {});
    const cheapestKey = Object.keys(filteredData).reduce((minKey, currentKey) => {
      const currentAnnualSpend = parseInt(filteredData[currentKey].annualSpend.replace(/\D/g, ''), 10);
      const minAnnualSpend = parseInt(filteredData[minKey].annualSpend.replace(/\D/g, ''), 10);
    
      return currentAnnualSpend < minAnnualSpend ? currentKey : minKey;
    }, gasDistributors[0]);
    
    this.handleChange("gasDistributor", cheapestKey);
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
  renderTerms = (showCC) => (
    <div>
      {!showCC &&
        <Fragment>
        <p>
          By clicking ‘Join Now’ and signing up to Kogan Energy, you agree to the Kogan First terms and conditions and Powershop providing your personal information to Kogan to register your Kogan First membership. By entering your details, even if you don't complete the form, you consent to Kogan Energy contacting you (including by calling you) to see if it can help you complete your signup to an energy contract.
        </p>
        <div className="u-font-h4">
          <ul className="kogan-benefits">
            <p>
              <strong>Kogan First Benefits:</strong>
              </p>
              <li>
                Earn Kogan Rewards
              </li>
              <li>
                Free Shipping
              </li>
              <li>
                Exclusive Member Specials
              </li>
              <li>
                Priority Customer Service 
              </li>
            </ul>
          </div>
          </Fragment>
      }
      <hr />
      {!showCC &&
          <Fragment>
          <p>
          *You receive a complimentary <a href="https://www.kogan.com/au/kogan-first/" target="_blank" rel="nofollow noopener">FIRST</a> membership for 12 months from when you switch to Kogan Energy. <a href="https://www.kogan.com/au/kogan-first-terms-conditions/" target="_blank">Kogan First Terms & Conditions available here</a>. After the initial 12 months, you’ll be charged the then current Kogan First membership annual fee which currently is $99 (incl GST). Membership fees subject to change. Offer not available to existing Kogan First members. 
        </p>
        </Fragment>
      }
      {showCC &&
          <Fragment>
          <p> By clicking ‘Join Now’ and entering your details, even if you don’t complete the form, you consent to Kogan Energy contacting you (including by calling you) to see if it can help you complete your signup to an energy contract.
            </p>
          <p>
          A one-off $99 (incl GST) sign up credit will be applied to your Kogan Energy account on your first electricity bill.
        </p>
        </Fragment>
      }
    </div>
  )

  renderGeneralTerms = () => {
    if (this.props.state === calcData.vic) {
      return (
        <div>
          <p>
            Ongoing contract, until you or we end it. Your bills will vary depending on your usage, rates and any price changes in the future. The estimate doesn’t include concessions or other rebates, distributor service order costs, fees or, for electricity, solar feed in tariffs that may apply to you. 
          </p>
          <p>
            You may also be able to access our standing offer, including the Victorian Default Offer. For more information, please call 1300 005 123.
          </p>
          <p>
            We may have other generally available offers that may be more suitable for you. Please call us if you want to discuss.
          </p>
        </div>
      )
    }
    return (
      <div>
        <br></br>
        <p>
          Ongoing contract, until you or we end it. Your bills will vary depending on your usage, rates and any price changes in the future. The estimate doesn’t include concessions or other rebates, distributor service order costs, fees or, for electricity, solar feed in tariffs that may apply to you.
        </p>
        <p>
          You may also be able to access our standing offer. For more information, please call 1300 005 123.
        </p>
        <p>
          We may have other generally available offers that may be more suitable for you. Please call us if you want to discuss.
        </p>
      </div>
    )
  }

  renderSwitchAppInfo = (isBasic, showCC) => {
    const { elecDistributor, gasDistributor, terms } = this.state;
    const { chosenFrequency, customerType, disableGasTab, state, showSolar, onClickJoinNow } = this.props;
    
    if (customerType === "residential") {
      let K1Benefit = ""
      if (elecDistributor && elecDistributor !== "") {
        let rates = ratesData.elecDistributorRatesResidential[elecDistributor]
        K1Benefit = (showCC) ? rates.K1BenefitNew : rates.K1Benefit
      }
      return (
        <Fragment>
          {(elecDistributor && elecDistributor !== "") && <SwitchAppResidentialSummarizedInfo
            rates={ratesData.elecDistributorRatesResidential[elecDistributor]}
            terms={terms}
            chosenFrequency={chosenFrequency}
            handleTerms={this.handleTerms}
            fuelType="electricity"
            distributor={elecDistributor}
            state={state}
            showSolar={showSolar}
            isBasic={isBasic}
            showCC={showCC}
          />}
          {(!disableGasTab && gasDistributor && gasDistributor !== "") && <SwitchAppResidentialSummarizedInfo
            rates={ratesData.gasDistributorRatesResidential[gasDistributor]}
            terms={terms}
            chosenFrequency={chosenFrequency}
            handleTerms={this.handleTerms}
            fuelType="gas"
            distributor={gasDistributor}
            state={state}
          />}
          <div className="s-cms-content u-font-h4">
            <ul className="kogan-benefits">
              {(!isBasic) && (
                <li>
                  {K1Benefit}
                </li>
              )}
              <li>
                Great customer service
              </li>
              <li>
                Easy to use app
              </li>
            </ul>
          </div>
          <hr />
          <center>
            <BrandedButton
              onClick={onClickJoinNow}>
              <ButtonLabel text="Join Now" />
              <ButtonIcon />
            </BrandedButton>
          </center>
        </Fragment>
      )
    } else {
      return (
        <div>
          {(elecDistributor && elecDistributor !== "") && <SwitchAppBusinessInfo
            rates={ratesData.elecDistributorRatesBusiness[elecDistributor]}
            fuelType="electricity"
            chosenFrequency={chosenFrequency}
            distributor={elecDistributor}
            state={state}
            showSolar={showSolar}
            showCC={showCC}
            isBasic={isBasic}
            onClickJoinNow={this.handleJoinNow}
          />}
          {(!disableGasTab && gasDistributor && gasDistributor !== "") && <SwitchAppBusinessInfo
            rates={ratesData.gasDistributorRatesBusiness[gasDistributor]}
            fuelType="gas"
            chosenFrequency={chosenFrequency}
            distributor={gasDistributor}
            state={state}
            onClickJoinNow={onClickJoinNow}
          />}
          <center>
            <BrandedButton
              onClick={onClickJoinNow}>
              <ButtonLabel text="Join Now" />
              <ButtonIcon />
            </BrandedButton>
          </center>
        </div>
      )
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
    const { currentType } = this.state;
    const { showCC } = this.props;

    return (
      <Fragment>
        <div className="o-grid-layout--columns-2-half-half-mobile o-grid-layout">
          <div className="c-switch-grid">
            <div className="c-switch-pricing-header">
              <label className="u-font-h5">Kogan Energy Basic</label>
              <label className="c-input-label-subheader">Make the switch to lower prices</label>
            </div>
            <div className="c-switch-pricing-body">
              {this.renderSwitchAppInfo(true, showCC)}
            </div>
          </div>
          <div>
            <div className="c-switch-pricing-header">
              <label className="u-font-h5">Kogan Energy FIRST</label>
              <label className="c-input-label-subheader">Save more off your bill with FIRST</label>
            </div>
            <div className="c-switch-pricing-body">
              {this.renderSwitchAppInfo(false, !showCC)}
            </div>
          </div>
        </div>
        {this.renderGeneralTerms()}
        <br /><br /><br />
      </Fragment>
    );
  }
}

SwitchAppResults.propTypes = propTypes;
SwitchAppResults.defaultProps = defaultProps;

export default SwitchAppResults;
