import React, { Component, Fragment } from "react";

// Data
import * as calcData from "../data/calcData";
import * as ratesData from "../data/ratesData";
// add basic plan data
import * as basicPlanData from "../data/basicPlanData";

// Components
import Header from "../components/Header";
import RatesResults from "../components/RatesResults";
// add basic plan results
import BasicPlanResults from "../components/BasicPlanResults";

import UserMessage from "../components/UserMessage";
import LayoutContainer from "../components/LayoutContainer";
import PostcodeEntry from "../views/PostcodeEntry";

// Utils
import * as Utils from "../utils";

const defaultAppState = props => ({
  postcode: "",
  distributors: [],
  gasDistributors: [],
  //ratesForThisPostcode: [],
  basicPlanForThisPostcode: [],
  customer: props.ratesCustomer,
});

class BasicPlanApp extends Component {

  /* scroll into view if results */
  componentDidUpdate() {
    const distributorIntro = this.el;
    if (distributorIntro) {
      this.el.scrollIntoView({behavior: "smooth", block: "center"});
    }
  }

  state = defaultAppState(this.props);

  data = {
    pcodeToDistrib: calcData.pcodeToDistrib,
    distToState: calcData.distToState,
    priceRates: ratesData.priceRates,
    pcodeToGasDistrib: ratesData.pcodeToGasDistrib,
    gasDbZones: ratesData.gasDbZones,

    basicPlanInfo: basicPlanData.basicPlanInfo,
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

    const state = this.data.distToState[distributors[0]]; // First match is fine, it'll resolve to the correct state

    const basicPlanForThisPostcode = Utils.getBasicPlanInfoForThisPostcode(
      this.data.basicPlanInfo,
      distributors,
      gasDistributors,
      this.state.customer,
      state
    );

    return this.setState({
      postcode,
      basicPlanForThisPostcode,
      distributors,
      gasDistributors,
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
      //ratesForThisPostcode,
      basicPlanForThisPostcode,
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
            {basicPlanForThisPostcode.length > 1 &&
            <p className="u-spacing-bottom-large" ref={el => {
              this.el = el;
            }}>
              By clicking on 'View plan' below, a new window will appear in your browser where you can find the Basic Plan Information for the plan on the Australian Government's Energy Made Easy wesbite. Kogan Energy Standing Offers are provided by Powershop Australia Pty Ltd.<a href="https://www.powershop.com.au/basic-plan-information/">
                    <strong> Click here</strong>
                  </a> to view standing offers.
            </p>}

            <BasicPlanResults rates={basicPlanForThisPostcode} />
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

export default BasicPlanApp;
