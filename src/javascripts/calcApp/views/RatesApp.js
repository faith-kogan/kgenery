import React, { Component, Fragment } from "react";

// Data
import * as calcData from "../data/calcData";
import * as ratesData from "../data/ratesData";

// Components
import Header from "../components/Header";
import RatesResults from "../components/RatesResults";
import UserMessage from "../components/UserMessage";
import LayoutContainer from "../components/LayoutContainer";
import PostcodeEntry from "../views/PostcodeEntry";

// Utils
import * as Utils from "../utils";

const defaultAppState = props => ({
  postcode: "",
  distributors: [],
  gasDistributors: [],
  ratesForThisPostcode: [],
  customer: props.ratesCustomer,
});

class RatesApp extends Component {
  state = defaultAppState(this.props);

  /* scroll into view if results */
  componentDidUpdate() {
    const distributorIntro = this.el;
    if (distributorIntro) {
      this.el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  data = {
    pcodeToDistrib: calcData.pcodeToDistrib,
    distToState: calcData.distToState,
    priceRates: ratesData.priceRates,
    pcodeToGasDistrib: ratesData.pcodeToGasDistrib,
    gasDbZones: ratesData.gasDbZones,
    pcodeToClimateZone: calcData.pcodeToClimateZone,
  };

  listDistributors = (distributors, lastIndex) =>
    distributors.map((item, i) => {
      if (i === lastIndex) {
        return (
          <span key={item}>
            <b>{item}</b>.{" "}
          </span>
        );
      }
      // Comma seperate all but the last one when there are more than 2
      if (distributors.length > 2 && i <= distributors.length - 3) {
        return (
          <span key={item}>
            <b>{item}</b>,{" "}
          </span>
        );
      }
      return (
        <span key={item}>
          <b>{item} </b> and{" "}
        </span>
      );
    });

  handlePostcode = postcode => {
    // If the user clears the field
    if (!postcode.length) {
      return this.handleStartAgain();
    }

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

    const ratesForThisPostcode = Utils.getAllRatesItems(
      this.data.priceRates,
      distributors,
      gasDistributors,
      this.state.customer,
      state,
      climateZone
    );

    return this.setState({
      postcode,
      ratesForThisPostcode,
      distributors,
      gasDistributors,
      state,
    });
  };

  handleStartAgain = () => {
    this.setState(defaultAppState(this.props));
  };

  renderMultipleDistributors = (distributors, type) => {
    const lastIndex = distributors.length - 1;
    return (
      <span>
        Looks like your postcode is over {distributors.length} {type}{" "}
        distribution areas, {this.listDistributors(distributors, lastIndex)}
      </span>
    );
  };

  renderPostcodeLookup = () => {
    const {
      distributors,
      gasDistributors,
      postcode,
      ratesForThisPostcode,
    } = this.state;

    const multipleDistributionAreas =
      distributors.length > 1 || gasDistributors.length > 1;

    return (
      <Fragment>
        <article className="c-centered-hero c-background-koganRed">
          <PostcodeEntry
            appState={this.state}
            handlePostcode={this.handlePostcode}
          />
        </article>

        {/* There are results */}
        {distributors.length > 0 && (
          <Fragment>
            {/* There is more than one distributor */}
            {multipleDistributionAreas ? (
              <p
                className="u-spacing-bottom-large"
                ref={el => {
                  this.el = el;
                }}
              >
                {distributors.length > 1 &&
                  this.renderMultipleDistributors(distributors, "electricity")}
                {gasDistributors.length > 1 &&
                  this.renderMultipleDistributors(gasDistributors, "gas")}
                You can find your distributor on your energy bill. If you’re not
                sure who your distributor is, please call us on{" "}
                <b>1300 005 123</b> so we can help you find it.
              </p>
            ) : (
              <Fragment>
              <p
                ref={el => {
                  this.el = el;
                }}
              >
                Energy rates and solar feed-in tariff information for{" "}
                <b>{this.state.postcode}</b> are outlined in the pdfs below. If
                you have difficulty determining which Basic Plan Information
                Document or rates apply to you, please call us on{" "}
                <b>1300 005 123</b>.
              </p>

            
              <hr />
              </Fragment>
            )}

            <RatesResults rates={ratesForThisPostcode} />
          </Fragment>
        )}

        {/* Show a user message if there are no results */}
        {distributors.length === 0 &&
          (gasDistributors.length === 0 &&
            postcode && (
              <UserMessage
                title="No results"
                text="No results found for that postcode"
              />
            ))}
      </Fragment>
    );
  };

  renderNoCustomerTypeError = () => (
    <Fragment>
      <Header title="Find your rates" />
      <UserMessage title="Error" text="No customer type" />
    </Fragment>
  );

  render() {
    return (
      <LayoutContainer>
        <div className="o-layout__item  u-10/12@tablet">
          {this.state.customer
            ? this.renderPostcodeLookup()
            : this.renderNoCustomerTypeError()}
        </div>
      </LayoutContainer>
    );
  }
}

export default RatesApp;
