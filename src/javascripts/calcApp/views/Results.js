import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

// Components
import Header from "../components/Header";
import TextLink from "../components/TextLink";
import LayoutContainer from "../components/LayoutContainer";
import * as Icons from "../components/Icons";

// Utils
import * as Utils from "../utils";

// PropTypes
import { appStatePropType, dataStatePropType } from "../propTypes";

class Results extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {

    // function to display form
    function showForm() {
      const resiForm = document.getElementsByClassName('resi-form');
      resiForm[0].classList.remove('u-hidden-visually');

      // replace the text or value
      const toolUsed = document.getElementById('input_7');
      toolUsed.value = 'Estimator';
    }

    showForm();
    
    const { appState, data, handleStartAgain } = this.props;

    const tariffs =
      appState.distributorName &&
      appState.tariffName &&
      data.pshopPricesByDist[appState.distributorName][appState.tariffName]
        .prices;

    const tariffsGst =
      appState.distributorName &&
      appState.tariffName &&
      data.pshopPricesByDistGst[appState.distributorName][appState.tariffName]
        .prices;

    const tariffUsageSplit =
      appState.tariffName && data.tariffUsageSplits[appState.tariffName];

    const fixedDailyCharges =
      appState.distributorName &&
      appState.tariffName &&
      data.pshopPricesByDist[appState.distributorName][appState.tariffName]
        .daily;

    const fixedDailyChargesGst =
      appState.distributorName &&
      appState.tariffName &&
      data.pshopPricesByDistGst[appState.distributorName][appState.tariffName]
        .daily;

    const monthyCost = Utils.numberWithCommas(
      Utils.rounded(appState.monthlyCost).toFixed(0)
    );

    const annualCost = Utils.numberWithCommas(
      Utils.rounded(appState.monthlyCost * 12).toFixed(0)
    );

    if (!appState.postCode && !appState.distributorName) {
      return <Redirect to="/" />;
    }

    return (
      <LayoutContainer>
        <div className="o-layout__item  u-8/12@tablet  u-6/12@wide">
          <Header title="Great news!" lessBottomSpacing>
            <div className="c-results-text">
              <p className="c-results-text__intro">
                Based on your usage of <b>{appState.annualConsumption}kWh</b>{" "}
                per year we estimate on average you will
              </p>

              <p className="c-results-text__price">
                pay
                <span>
                  ${Utils.numberWithCommas(
                    Utils.rounded(appState.monthlyCost * 3).toFixed(0)
                  )}{" "}
                </span>
                per quarter
              </p>

              <p className="c-rounded-title">
                <span>or</span>
              </p>

              <p className="c-results-text__terms">
                {`$${monthyCost}`} monthly (avg.) / {`$${annualCost}`} annually.
                <small>(These estimates include GST)</small>
              </p>

              <p className="u-text-center">
                <a href="/switch-now" className="c-btn c-btn--icon-right c-btn--pink c-btn--full@mobile c-btn--join c-btn--join-get-price c-btn--join-estimator">
                  Join now
                  <svg width="500px" height="550px" viewBox="0 0 500 550" xmlns="http://www.w3.org/2000/svg">
                    <path d="M497.9,239.4c-1.4-3.4-3.4-6.5-6-9L325.2,63.7c-10.8-10.8-28.5-10.8-39.3,0s-10.8,28.5,0,39.3l119.2,119.2H27.8 C12.4,222.2,0,234.7,0,250c0,15.3,12.4,27.8,27.8,27.8h377.4L285.9,397c-10.8,10.8-10.8,28.5,0,39.3s28.5,10.8,39.3,0l166.7-166.7 c2.6-2.6,4.6-5.6,6-9C500.7,253.8,500.7,246.2,497.9,239.4z" />
                  </svg>
                </a>
              </p>

              <p className="u-font-p3-medium u-text-center">
                <TextLink
                  onClick={handleStartAgain}
                  text="Get another estimate or compare a bill"
                  icon={<Icons.Zap />}
                />
              </p>
            </div>
          </Header>
          <section>
            <table className="c-table  c-table--centered">
              <thead>
                <tr>
                  <th>Made up of</th>
                  <th>% of use</th>
                  <th>Rate ex. GST</th>
                  <th>Rate inc. GST</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Made up of">Daily supply charge</td>
                  <td data-label="% of use">&nbsp;</td>
                  <td data-label="Rate ex. GST">
                    {Utils.rounded(fixedDailyCharges, 0.01).toFixed(2)}&cent;
                  </td>
                  <td data-label="Rate inc. GST">
                    {Utils.rounded(fixedDailyChargesGst, 0.01).toFixed(2)}&cent;
                  </td>
                </tr>
                {tariffs &&
                  tariffs.map((item, i) => (
                    <tr key={item}>
                      <td data-label="Made up of">{tariffUsageSplit[1][i]}</td>
                      <td data-label="% of use">{tariffUsageSplit[0][i]}%</td>
                      <td data-label="Rate ex. GST">
                        {Utils.rounded(tariffs[i], 0.01).toFixed(2)}&cent;
                      </td>
                      <td data-label="Rate inc. GST">
                        {Utils.rounded(tariffsGst[i], 0.01).toFixed(2)}&cent;
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
          <section className="o-layout  u-ui-section">
            <div className="o-layout__item  u-1/1">
              <h5>The fine print</h5>
              <ul>
                <li>
                  To take advantage of this price you must purchase the Power Saver Powerpack.
                </li>
                <li>
                  These estimates are based on our most recent prices so you can
                  make your own comparison with your current retailer’s rates.
                  They assume you will login to our online Shop and buy the Power 
                  Saver product once a month to cover your usage in full. They 
                  include GST and the daily supply charges. When you compare them, be sure to
                  include any price changes, daily supply charges and GST from
                  your current supplier and deduct any relevant prompt payment
                  discounts.
                </li>
                <li>
                  If you use power in a different proportion than the
                  percentages shown in the breakdown above, then you should
                  expect to pay more, or less, for your power than our estimate.
                </li>
                <li>
                  The above estimate is purely indicative, and Powershop does
                  not guarantee that your annual costs will reflect the above –
                  the annual cost may change (ie. based on your usage habits).
                </li>
                <li>
                  Further information on <a href="https://powershop.com.au/terms-and-conditions/customer-terms-and-conditions/" target="_blank">
                  Powershop's customer terms and conditions</a> can be found under Customer Terms and Conditions,
                  and this page should be read subject to those terms and
                  conditions.
                </li>
                <li>
                  The prices above represent a discount to our Auto Pay rates. Refer
                  to our <a href="https://powershop.com.au/find-your-rates-residential/" target="_blank">Price and Product Information Statement</a> (PPIS) for
                  further information.
                </li>
              </ul>
              <a class="c-btn c-btn--outlined c-btn--centered c-btn--grey c-btn--full@mobile" href="https://www.powershop.com.au/basic-plan-information" target="_blank">View Basic Plan Information</a>
            </div>
          </section>
        </div>
      </LayoutContainer>
    );
  }
}

Results.propTypes = {
  appState: PropTypes.shape(appStatePropType).isRequired,
  data: PropTypes.shape(dataStatePropType).isRequired,
  handleStartAgain: PropTypes.func.isRequired,
};

export default Results;
