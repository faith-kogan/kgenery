import React, { Component, Fragment } from "react";

// Data
import * as calcData from "../data/calcData";
import * as ratesData from "../data/ratesData";
import * as distributorData from "../data/distributorData";

// Components
import Header from "../components/Header";
import RatesResults from "../components/RatesResults";
// add distributor results
import DistributorResults from "../components/DistributorResults";

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
  distributorForThisPostcode: [],
  customer: props.ratesCustomer,
});

class DistributorApp extends Component {
  state = defaultAppState(this.props);

  /* scroll into view if results */
  componentDidUpdate() {
    const distributorIntro = this.el;
    if (distributorIntro) {
      this.el.scrollIntoView({behavior: "smooth", block: "center"});
    }
  }

  data = {
    pcodeToDistrib: calcData.pcodeToDistrib,
    distToState: calcData.distToState,
    priceRates: ratesData.priceRates,
    pcodeToGasDistrib: ratesData.pcodeToGasDistrib,
    gasDbZones: ratesData.gasDbZones,

    distributorInfo: distributorData.distributorInfo,
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

    /*
    const ratesForThisPostcode = Utils.getRatesItemsForThisPostcode(
      this.data.priceRates,
      distributors,
      gasDistributors,
      this.state.customer,
      state
    );
    */


    const distributorForThisPostcode = Utils.getDistributorInfoForThisPostcode(
      this.data.distributorInfo,
      distributors,
      gasDistributors,
      this.state.customer,
      state
    );


    return this.setState({
      postcode,
      distributorForThisPostcode,
      //ratesForThisPostcode,
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
      distributorForThisPostcode,
    } = this.state;

    const multipleDistributionAreas =
      distributors.length > 1 || gasDistributors.length > 1;

    return (
      <Fragment>
        <article className="c-centered-hero  c-background-koganRed">
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
              <p className="u-spacing-bottom-large" ref={el => {
                this.el = el;
              }}>
                {distributors.length > 1 &&
                  this.renderMultipleDistributors(distributors, "electricity")}
                {gasDistributors.length > 1 &&
                  this.renderMultipleDistributors(gasDistributors, "gas")}
                You can find your distributor on your energy bill. If you’re not
                sure who your distributor is, please call us on{" "}
                <b>1300 005 123</b> so we can help you find it.
              </p>
            ) : (
              <p className="u-spacing-bottom-large" ref={el => {
                this.el = el;
              }}>
                Energy distributor information for postcode{" "}
                <b>{this.state.postcode}</b> are shown below.
              </p>
            )}

            <DistributorResults rates={distributorForThisPostcode} />
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

export default DistributorApp;
