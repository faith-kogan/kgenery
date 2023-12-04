import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

// Components
import Slider from "react-rangeslider";
import * as Icons from "../components/Icons";
import LayoutContainer from "../components/LayoutContainer";
import Header from "../components/Header";
import Button from "../components/Button";
import TextLink from "../components/TextLink";
import RangeSliderKey from "../components/RangeSliderKey";

// Utils
import * as Utils from "../utils";

// PropTypes
import { appStatePropType } from "../propTypes";

class UsageSlider extends Component {
  state = {
    annualConsumption: this.props.appState.annualConsumption,
  };

  handleChange = annualConsumption => {
    this.setState({
      annualConsumption,
    });
  };

  handleGetResults = event => {
    event.preventDefault();
    // Update the usage with the value from the slider
    this.props.handleUsage(this.state.annualConsumption);
  };

  render() {
    const formatkWh = value => `${Utils.numberWithCommas(value)} kWh`;
    const { appState, handleStartAgain } = this.props;

    if (!appState.distributorName) {
      return <Redirect to="/" />;
    }

    return (
      <LayoutContainer>
        <div className="o-layout__item  u-10/12@desktop">
          <Header title="Get a price" />

          <form
            onSubmit={this.handleGetResults}
            className="c-form  c-form--bordered  c-form--wide"
          >
            <fieldset>
              <legend>
                <span>One last thing&hellip;</span>
                Can you estimate your annual electricity usage?
              </legend>
              <div className="c-rangeslider">
                <Slider
                  min={appState.annualUsageMin}
                  max={appState.annualUsageMax}
                  value={this.state.annualConsumption}
                  step={5}
                  format={formatkWh}
                  handleLabel={formatkWh(this.state.annualConsumption)}
                  tooltip={false}
                  onChange={this.handleChange}
                />
                <RangeSliderKey />
              </div>

              <div className="u-text-center">
                <Button
                  type="submit"
                  icon={<Icons.ArrowRight />}
                  pink
                  iconRight
                  chunky
                  fullAtMobile
                >
                  Get my estimate
                </Button>
              </div>
            </fieldset>
          </form>

          <TextLink
            onClick={handleStartAgain}
            type="button"
            icon={<Icons.Zap />}
            text="Actually, I&apos;d rather compare a bill instead"
          />
        </div>
      </LayoutContainer>
    );
  }
}

UsageSlider.propTypes = {
  appState: PropTypes.shape(appStatePropType).isRequired,
  handleUsage: PropTypes.func.isRequired,
  handleStartAgain: PropTypes.func.isRequired,
};

export default UsageSlider;
