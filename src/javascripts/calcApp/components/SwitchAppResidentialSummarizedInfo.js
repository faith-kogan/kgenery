import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Data
import * as calcData from "../data/calcData";
import Button from "../components/Button";
import KoganBrandedButton from "../components/kogan/KoganBrandedButton";
import Tooltip from "../components/Tooltip";

const SwitchAppResidentialSummarizedInfo = props => {
  const {
    rates,
    chosenFrequency,
    fuelType,
    distributor,
    state,
    terms,
    handleTerms,
    showSolar,
    showCC,
  } = props;

  let averageSpend, percentageDiff, percentageDiffLessMore, K1Benefit, includes12months, includes12monthsgas;

  if (showSolar) {
    ({
      averageSpendSolar: averageSpend,
      percentageDiffSolar: percentageDiff,
      percentageDiffLessMoreSolar: percentageDiffLessMore
    } = rates);
  }
  if (showCC) {
    ({
      averageSpendCC: averageSpend,
      percentageDiffCC: percentageDiff,
      percentageDiffLessMoreSolar: percentageDiffLessMore,
      K1BenefitNew: K1Benefit,
      includes49: includes12months,
      includes49gas: includes12monthsgas
    } = rates);
  }
  else {
    ({
      averageSpend, percentageDiff, percentageDiffLessMore, K1Benefit, includes12months, includes12monthsgas
    } = rates);
  }

  let electricitySpendPerFrequency = averageSpend || "0"
  let gasSpendPerFrequency = rates.annualSpend || "0"
  let frequency = "annual"
  let duration = "year"
  if (chosenFrequency === "monthly") {
    electricitySpendPerFrequency = (parseInt(electricitySpendPerFrequency.replace(/\D/g, ''), 10) / 12).toFixed(2);
    gasSpendPerFrequency = (parseInt(gasSpendPerFrequency.replace(/\D/g, ''), 10) / 12).toFixed(2);
    electricitySpendPerFrequency = `$${electricitySpendPerFrequency.toLocaleString()}`;
    gasSpendPerFrequency = `$${gasSpendPerFrequency.toLocaleString()}`;
    frequency = "monthly"
    duration = "month"
  } else if (chosenFrequency === "quarterly") {
    electricitySpendPerFrequency = (parseInt(electricitySpendPerFrequency.replace(/\D/g, ''), 10) / 4).toFixed(2);
    gasSpendPerFrequency = (parseInt(gasSpendPerFrequency.replace(/\D/g, ''), 10) / 4).toFixed(2);
    electricitySpendPerFrequency = `$${electricitySpendPerFrequency.toLocaleString()}`;
    gasSpendPerFrequency = `$${gasSpendPerFrequency.toLocaleString()}`;
    frequency = "quarterly"
    duration = "quarter"
  }

  return (
    <div className="s-cms-content ">
      {fuelType === "electricity" ? (
        <Fragment>
          <div className="kogan-estimate">

            <div className="c-switch-app-packs-flex">
                <div className="u-font-h6"><strong>Electricity:<br/> {electricitySpendPerFrequency} per {duration}</strong></div>
                <div className="kogan-rates">
                    <div className="u-font-h6"><strong>{percentageDiff}</strong></div>
                    <div className="ref-price u-font-p4">
                    {percentageDiffLessMore} the{' '}
                    {state === calcData.vic ? (
                        <Fragment>
                            Victorian Default Offer{' '}
                            <Tooltip
                            name="distributorNameTip"
                            content="The Victorian Default Offer is a set of rates set by the Essential Services Commission (ESC) which we are required to compare our Market Offer against."
                            />
                        </Fragment>
                        ) : (
                        <Fragment>
                            reference price{' '}
                            <Tooltip
                            name="distributorNameTip"
                            content="The Federal government requires all energy retailers in NSW, QLD and SA to compare their Market Offer against the Default Market Offer. The Default Market Offer is a maximum annual price retailers can charge a Standing Offer customer based on a residential customer’s usage, tariff and distribution area and is referred to as the reference price."
                            />
                        </Fragment>
                        )}
                    </div>
                </div>
            </div>
            <div className="u-font-p5 secondary"><i>All prices quoted include GST</i></div>
          </div>
          <hr />
          <p>
            
             {state === calcData.vic ? ( 
              <p>
              The estimated {frequency} cost is {electricitySpendPerFrequency}. {includes12months} These prices are based on a residential customer who uses <strong>{rates.energyConsumed}</strong> per year on a <strong>{rates.tariffName}</strong> tariff in the <strong>{distributor}</strong> network. Your actual bill will vary based on your usage and tariff. If you have a different tariff type, such as a Time of Use Tariff, view your 
                <Fragment>
                  <a href="/vefs/">
                    <strong> Energy Fact Sheet</strong>
                  </a>. 
                
                </Fragment>
                </p>
              ) : (
              <p>
              The estimated {frequency} cost is {electricitySpendPerFrequency}. {includes12months} These prices are based on a residential customer who uses   <strong>{rates.energyConsumed}</strong> per year on a <strong>{rates.tariffName}</strong> tariff in the <strong>{distributor}</strong> network. Your actual bills will vary depending on your usage and any price changes in the future – you'll be notified of any change in accordance with our regulatory requirements. This is an ongoing contract (until you or we end it) with no exit fees. If you have a different tariff type, such as a Time of Use Tariff, view your 
                <Fragment>
                  <a href="/basic-plan-information/">
                    <strong> Basic Plan Information</strong>
                  </a>.
                </Fragment>
                </p>
              )}
            </p>
          <hr />
          {
            showSolar &&
            <Fragment>
              <div className="u-font-h5">
                Solar feed-in tariff - <span className="font-normal-weight">{rates.solarFeed}</span>
              </div>
              <hr />
            </Fragment>
          }
        </Fragment>
      ) : (
        <Fragment>
        <Fragment>
        <div className="kogan-estimate">
            <div className="u-font-h6"><strong>Gas: {gasSpendPerFrequency} per {duration}</strong></div>
            <div className="u-font-p5 secondary"><i>All prices quoted include GST</i></div>
          </div>
          {state === calcData.vic ? (
          <p>
            The estimated {frequency} cost is {gasSpendPerFrequency}. 
            {showCC &&
            <Fragment>
                this includes a one-off $99 (incl GST) sign up credit.
            </Fragment>
          } These prices are based on a residential customer who uses <strong>{rates.energyConsumed}</strong> per year on
            a <strong>Single Rate tariff</strong> in the <strong>{distributor}</strong> network. Your actual bill will vary based on your usage. View your <strong><a href="/vefs/" target="_blank" rel="nofollow noopener">Energy Fact Sheet</a></strong>. 
          </p>
          ) : (
          <p>
            The estimated annual cost is {gasSpendPerFrequency}. {showCC &&
            <Fragment>
                this includes a one-off $99 (incl GST) sign up credit.
            </Fragment>
          } These prices are based on a residential customer who uses <strong>{rates.energyConsumed}</strong> per year on
            a <strong>Single Rate tariff</strong> in the <strong>{distributor}</strong> network. Your actual bill will vary based on your usage. View your <strong><a href="/basic-plan-information/" target="_blank" rel="nofollow noopener">Basic Plan Information</a></strong>. 
            
          </p>

          )}
          <hr />
        </Fragment>
      </Fragment>
      )}
    </div>
  );
};

SwitchAppResidentialSummarizedInfo.propTypes = {
  rates: PropTypes.shape({}).isRequired,
  fuelType: PropTypes.string.isRequired,
  distributor: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  showSolar: PropTypes.bool,
  showCC: PropTypes.bool,
};

SwitchAppResidentialSummarizedInfo.defaultProps = {
  showSolar: false,
  showCC: false,
};

export default SwitchAppResidentialSummarizedInfo;
