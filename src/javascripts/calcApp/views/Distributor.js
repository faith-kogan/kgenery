import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

// Components
import * as Icons from "../components/Icons";
import LayoutContainer from "../components/LayoutContainer";
import Button from "../components/Button";
import Header from "../components/Header";
import Tooltip from "../components/Tooltip";

// Utils
import * as Utils from "../utils";

// PropTypes
import { appStatePropType, dataStatePropType } from "../propTypes";

class Distributor extends Component {
  handleDistributorOrTariffChange = event => {
    this.props.handleDistributorOrTariffChange({
      [event.target.name]: event.target.value,
    });
  };

  // If there is only one distributor, we need to populate this field
  handleSingleDistributor = distributors => {
    this.props.handleDistributorOrTariffChange({
      distributorName: distributors[0],
    });
  };

  handleGoToUsage = event => {
    event.preventDefault();
    const { appState, data } = this.props;

    const distributors = Utils.getDistributors(
      appState.postcode,
      data.pcodeToDistrib
    );

    const onlyOneDistributor = distributors.length === 1;

    if (onlyOneDistributor) {
      this.handleSingleDistributor(distributors);
    }

    this.props.handleGoToUsage();
  };

  render() {
    const { appState, data } = this.props;

    const distributors = Utils.getDistributors(
      appState.postcode,
      data.pcodeToDistrib
    );

    const onlyOneDistributor = distributors.length === 1;

    // If there is only one distributor, use it to populate the tariffs
    const tariffs = onlyOneDistributor
      ? data.pshopPricesByDist[distributors[0]]
      : data.pshopPricesByDist[appState.distributorName];

    const tariffNames = tariffs && Object.keys(tariffs).sort();

    if (!appState.postcode) {
      return <Redirect to="/" />;
    }

    return (
      <LayoutContainer>
        <div className="o-layout__item  u-8/12@tablet  u-6/12@wide">
          <Header title="Get a price" />
          <form
            onSubmit={this.handleGoToUsage}
            className="c-form  c-form--bordered"
          >
            <fieldset>
              <legend>
                {onlyOneDistributor
                  ? "Let us know what tariff you’re on"
                  : "Select your distributor"}
              </legend>
              {distributors &&
                !onlyOneDistributor && (
                  <div className="c-input">
                    <p className="c-input__info">
                      Your postcode is over two distribution areas. Can you
                      confirm which distribution area you’re in?
                    </p>

                    <label htmlFor="distributorName" className="c-input-label">
                      Distributor
                      <Tooltip
                        name="distributorNameTip"
                        content="You can find your distributor on your power bill. We need to know so we can give you the most accurate estimate possible."
                      />
                    </label>
                    <select
                      className="c-select"
                      name="distributorName"
                      id="distributorName"
                      onChange={this.handleDistributorOrTariffChange}
                      value={
                        (onlyOneDistributor && distributors[0]) ||
                        appState.distributorName
                      }
                    >
                      <option value="">Select your distributor</option>
                      {distributors.map(item => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

              {tariffNames && (
                <div className="c-input">
                  <label htmlFor="select" className="c-input-label">
                    Tariff
                    <Tooltip
                      name="tariffNameTip"
                      content="We know regular people don’t know their tariff type but we have to ask because it means we can give you the most accurate estimate possible. You can find your tariff type on your power bill. Can’t find it? If you want a less accurate estimate you can choose ‘Anytime’, as about 70% of our customers are on an ‘Anytime’ rate."
                    />
                  </label>
                  <select
                    className="c-select"
                    name="tariffName"
                    id="tariffName"
                    onChange={this.handleDistributorOrTariffChange}
                    defaultValue={appState.tariffName}
                  >
                    <option value="">Select your tariff type</option>
                    {tariffNames.map(item => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <Button
                type="submit"
                disabled={!appState.tariffName}
                icon={<Icons.ArrowRight />}
                pink
                chunky
                full
                iconRight
              >
                Continue
              </Button>
            </fieldset>
          </form>
        </div>
      </LayoutContainer>
    );
  }
}

Distributor.propTypes = {
  appState: PropTypes.shape(appStatePropType).isRequired,
  data: PropTypes.shape(dataStatePropType).isRequired,
  handleDistributorOrTariffChange: PropTypes.func.isRequired,
  handleGoToUsage: PropTypes.func.isRequired,
};

export default Distributor;
