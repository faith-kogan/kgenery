/**
 * Get a price calculator
 *
 * This is the main file, contains the global state and the routing
 * Most other views have local state which they pass to this component
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";

// Data
import * as calcData from "../data/calcData";

// Components
import GetAPrice from "./GetAPrice";
import Distributor from "./Distributor";
import UsageSlider from "./UsageSlider";
import Results from "./Results";
import UploadResults from "./UploadResults";

// Utils
import * as Utils from "../utils";

const defaultAppState = {
  annualConsumption: 6000,
  annualUsageMax: 11000,
  annualUsageMin: 1000,
  calculatedUnitPrice: null,
  consumptionBand: "med",
  monthlyCost: 120,
  peakPerc: 0.6,
  postcode: "",
  distributorName: "",
  tariffName: "",
  uploadData: null,
  uploadErrorMessage: null,
};


class CalcApp extends Component {
  state = defaultAppState;

  computeAndSetCalcedValsFromAnnualConsump = annualConsumption => {
    const { data } = this;

    const { distributorName, tariffName, peakPerc } = this.state;

    const band = "med";

    const monthlyCost = Utils.getMonthlySpend(
      annualConsumption,
      data,
      distributorName,
      tariffName
    );

    const unitprice = Utils.getUnitPrice(
      annualConsumption,
      data,
      distributorName,
      tariffName,
      peakPerc
    );

    /* eslint-disable react/no-unused-state */
    // It's used deeper in the app
    this.setState({
      annualConsumption,
      consumptionBand: band, // @NOTE: Is this needed?
      monthlyCost,
      calculatedUnitPrice: unitprice,
    });
  };

  handlePostcode = postcode => {
    const { history } = this.props;
    this.setState({
      postcode,
    });

    // Hide the user notice
    this.userNotice.classList.add("u-hide");

    history.push("/distributor");
  };

  handleUsage = annualConsumption => {
    const { history } = this.props;
    this.computeAndSetCalcedValsFromAnnualConsump(annualConsumption);

    // Go to the results
    history.push("/results");
    //this.userDetailsForm.classList.remove("u-hide");
  };

  handleDistributorOrTariffChange = fieldData => {
    this.setState(fieldData);
  };

  handleGoToUsage = () => {
    const { history } = this.props;
    history.push("/usage");
  };

  handleUploadResults = (uploadResponseData, uploadErrorMessage) => {
    const { history } = this.props;

    this.setState({
      uploadData: uploadResponseData,
      uploadErrorMessage,
    });

    history.push("/uploadResults");

    /*
    if (uploadErrorMessage) {
      this.userDetailsFormError.classList.remove("u-hide");
    } else {
      this.userDetailsForm.classList.remove("u-hide");
    }
    */

    // Hide the user notice
    this.userNotice.classList.add("u-hide");
  };

  handleStartAgain = () => {

    // hide either form
    document.getElementsByClassName('resi-form')[0].classList.add('u-hidden-visually');

    const { history } = this.props;
    this.setState(defaultAppState);
    history.push("/");

    // Show the user notice
    this.userNotice.classList.remove("u-hide");

    // Hide the user forms
    //this.userDetailsForm.classList.add("u-hide");
    //this.userDetailsFormError.classList.add("u-hide");
  };

  data = {
    pcodeToDistrib: calcData.pcodeToDistrib,
    pshopPricesByDist: calcData.pshopPricesByDist,
    pshopPricesByDistGst: calcData.pshopPricesByDistGst,
    tariffUsageSplits: calcData.tariffUsageSplits,
  };

  userNotice = document.querySelector("[data-calc-upload-notice]");
  //userDetailsForm = document.querySelector("[data-calc-form]");
  //userDetailsFormError = document.querySelector("[data-calc-form-error]");

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <GetAPrice
                appState={this.state}
                data={this.data}
                handlePostcode={this.handlePostcode}
                handleUploadResults={this.handleUploadResults}
              />
            )}
          />
          <Route
            exact
            path="/distributor"
            component={() => (
              <Distributor
                appState={this.state}
                data={this.data}
                handleDistributorOrTariffChange={
                  this.handleDistributorOrTariffChange
                }
                handleGoToUsage={this.handleGoToUsage}
              />
            )}
          />
          <Route
            exact
            path="/usage"
            component={() => (
              <UsageSlider
                appState={this.state}
                data={this.data}
                handleUsage={this.handleUsage}
                handleStartAgain={this.handleStartAgain}
              />
            )}
          />
          <Route
            exact
            path="/results"
            component={() => (
              <Results
                appState={this.state}
                data={this.data}
                handleStartAgain={this.handleStartAgain}
              />
            )}
          />
          <Route
            exact
            path="/uploadResults"
            component={() => (
              <UploadResults
                uploadData={this.state.uploadData}
                uploadErrorMessage={this.state.uploadErrorMessage}
                handleStartAgain={this.handleStartAgain}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

CalcApp.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withRouter(CalcApp);
