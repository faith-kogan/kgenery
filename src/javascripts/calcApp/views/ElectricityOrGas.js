import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import Header from "../components/Header";
import * as Icons from "../components/Icons";
import LayoutContainer from "../components/LayoutContainer";
import Button from "../components/Button";
import TextLink from "../components/TextLink";

// PropTypes
import { appStatePropType } from "../propTypes";

/* eslint-disable react/prefer-stateless-function */
// @@TODO - update this to a stateless function
class ElectricityOrGas extends Component {
  render() {
    const { terms, termsUrl } = this.props.appState;
    // const { chosenFuelType } = this.state;
    const { handleStartAgain, handleSubmit } = this.props;

    return (
      <LayoutContainer>
        <div className="o-layout__item  u-10/12@wide">
          <Header title="Make the switch" lessBottomSpacing>
            <p className="u-text-center  u-margin-bottom-zero  c-section-heading__content">
              Select the services you’d like to sign up for - we’ll make the
              switch easy.
            </p>
          </Header>
          <article className="u-text-center  c-split-callout  c-split-callout--short">
            <header className="u-bg-pink-to-purple">
              <Icons.ZapGas />
              <h2 className="u-font-h5  has-content">Electricity &amp; Gas</h2>
              <div className="c-split-callout__content">
                <p>
                  Have both electricity and gas at your property? <br /> This is the option for you.
                </p>
              </div>
              <Button
                element="button"
                onClick={() => handleSubmit("dual_fuel")}
                disabled={!!(!terms && termsUrl)}
                chunky
                centered
                outlined
                white
              >
                Select
              </Button>
            </header>
            <footer>
              {<Icons.ZapThin />}
              <h2 className="u-font-h5  has-content">
                Just electricity thanks
              </h2>
              <div className="c-split-callout__content">
                <p>
                  Only electricity at your property? <br />This is the option for
                  you.
                </p>
              </div>
              <Button
                element="button"
                onClick={() => handleSubmit("electricity")}
                disabled={!!(!terms && termsUrl)}
                chunky
                centered
                outlined
                pink
              >
                Select
              </Button>
            </footer>
          </article>

          <TextLink
            onClick={handleStartAgain}
            type="button"
            icon={<Icons.Zap />}
            text="Start over"
          />
        </div>
      </LayoutContainer>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

ElectricityOrGas.propTypes = {
  appState: PropTypes.shape(appStatePropType).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleStartAgain: PropTypes.func.isRequired,
};

export default ElectricityOrGas;
