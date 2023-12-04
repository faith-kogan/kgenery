import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";
import Cookies from "js-cookie";

// Data
import * as calcDataSA from "../data/calcDataSA";
import * as ratesDataSA from "../data/ratesDataSA";

// Components
import Header from "../components/Header";
// import Button from "../components/Button";
import ElectricityOrGas from "./ElectricityOrGas";
import PostcodeEntry from "../views/PostcodeEntrySA";

// Utils
import * as Utils from "../utils";
import LayoutContainer from "../components/LayoutContainer";

const defaultAppState = {
  postcode: "",
  distributors: [],
  gasDistributors: [],
  fuelType: "",
  chosenFuelType: "",
  promoId: Cookies.get("promo-id"),
  termsUrl: Cookies.get("promo-terms-url"),
  terms: false,
};

class SwitchAppSA extends Component {
  state = defaultAppState;

  // Default state needs to be /
  componentDidMount() {
    const { history } = this.props;

    if (history.location.pathname !== "/") {
      history.push("/");
    }
  }

  componentDidUpdate() {
    const { postcode, terms, termsUrl, chosenFuelType } = this.state;

    if (termsUrl) {
      if (postcode && terms && chosenFuelType) {
        this.submit.click();
      }
    } else if (postcode && chosenFuelType) {
      this.submit.click();
    }
  }

  data = {
    pcodeToDistribSA: calcDataSA.pcodeToDistribSA,
    pcodeToGasDistrib: ratesDataSA.pcodeToGasDistrib,
  };

  handlePostcodeSubmit = postcode => {
    // If the user clears the field
    if (!postcode.length) {
      return this.handleStartAgain();
    }

    const distributors = Utils.getDistributors(
      postcode,
      this.data.pcodeToDistribSA
    );

    const gasDistributors = Utils.getGasDistributors(
      postcode,
      this.data.pcodeToGasDistrib
    );

    const fuelType = Utils.getFuelType(distributors, gasDistributors);

    /* eslint-disable react/no-unused-state */
    this.setState({
      postcode,
      fuelType,
      terms: true,
    });
    /* eslint-enable react/no-unused-state */

    if (fuelType === "electricity") {
      return this.handleSubmit("electricity");
    }

    const { history } = this.props;
    return history.push("/select");
  };

  handleStartAgain = () => {
    const { history } = this.props;
    this.setState(defaultAppState);
    history.push("/");
  };

  handleSubmit = fuelType => {
    this.setState({ chosenFuelType: fuelType });
  };

  renderPostcodeLookup = () => (
    <LayoutContainer>
      <div className="o-layout__item  u-10/12@tablet">
        <Header title="Make the switch" lessBottomSpacing>
          <p className="u-text-center  u-margin-bottom-zero  c-section-heading__content">
            Enter your postcode below and we’ll get the process moving. South Australian postcodes only.
          </p>
        </Header>
        <article className="c-centered-hero  u-bg-pink-to-purple">
          <PostcodeEntry
            appState={this.state}
            handlePostcode={this.handlePostcodeSubmit}
            //bypassPostcodeServicabilityCheck
          />
        </article>
      </div>
    </LayoutContainer>
  );

  render() {
    const { promoId, chosenFuelType, postcode, terms } = this.state;
    return (
      <div>
        <form
          acceptCharset="UTF-8"
          action="https://secure.powershop.com.au/signup/personal_details"
          method="post"
        >
          <input name="promotion_id" type="hidden" value={promoId} />
          <input name="signup_type" type="hidden" value={chosenFuelType} />
          <input name="postcode" type="hidden" value={postcode} />
          <input
            name="accept_ts_and_cs"
            type="hidden"
            checked={terms}
            readOnly
          />
          <Switch>
            <Route
              exact
              path="/"
              component={() => this.renderPostcodeLookup()}
            />
            <Route
              exact
              path="/select"
              component={() => (
                <ElectricityOrGas
                  appState={this.state}
                  handleStartAgain={this.handleStartAgain}
                  handleSubmit={this.handleSubmit}
                />
              )}
            />
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
    );
  }
}

SwitchAppSA.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withRouter(SwitchAppSA);
