import React, { Component } from "react";
import PropTypes from "prop-types";
import HTMLParser from "react-html-parser";

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
class StandardOrLite extends Component {
  render() {
    const { terms, termsUrl } = this.props.appState;
    // const { chosenFuelType } = this.state;
    const { leftContent, rightContent, handleStartAgain, handleOptionSubmit } = this.props;

    return (
      <LayoutContainer>
        <div className="o-layout__item  u-10/12@wide">
          <Header title="Make the switch" lessBottomSpacing>
            <p className="u-text-center  u-margin-bottom-zero  c-section-heading__content">
              Select the shop type you'd like to sign up for
            </p>
          </Header>
          <article className="c-split-callout  c-split-callout--short">
            <header className="u-bg-pink-to-purple c-split-callout__lite-option">
              <Icons.PowershopLogo />
              <div className="c-split-callout__content">
                {HTMLParser(leftContent)}
              </div>
              <Button
                element="button"
                onClick={() => handleOptionSubmit("standard")}
                disabled={!!(!terms && termsUrl)}
                chunky
                centered
                outlined
                white
              >
                Select
              </Button>
            </header>
            <footer className="c-split-callout__lite-option">
              <Icons.PowershopLogoLite />
              <div className="c-split-callout__content">
              {HTMLParser(rightContent)}
              </div>
              <Button
                element="button"
                onClick={() => handleOptionSubmit("lite")}
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

StandardOrLite.propTypes = {
  appState: PropTypes.shape(appStatePropType).isRequired,
  leftContent: PropTypes.string.isRequired,
  handleOptionSubmit: PropTypes.func.isRequired,
  handleStartAgain: PropTypes.func.isRequired,
};

export default StandardOrLite;
