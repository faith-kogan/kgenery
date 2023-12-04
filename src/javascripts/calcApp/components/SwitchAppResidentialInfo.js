import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Data
import * as calcData from "../data/calcData";
import Button from "../components/Button";
import KoganBrandedButton from "../components/kogan/KoganBrandedButton";
import Tooltip from "../components/Tooltip";

const SwitchAppResidentialInfo = props => {
  const {
    rates,
    fuelType,
    distributor,
    state,
    terms,
    handleTerms,
    showSolar,
    showCC,
    onClickJoinNow,
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

  return (
    <div className="s-cms-content ">
      {fuelType === "electricity" ? (
        <Fragment>
          <div className="kogan-estimate">
            <div className="u-font-p1"><strong>Pay an estimated</strong></div>
            <div className="u-font-h3">
              {averageSpend} per year
            </div>
            <div className="u-font-p2 secondary">All prices quoted include GST</div>
          </div>
          <hr />
          <div className="kogan-rates">
            <div className="u-font-h3"><strong>{percentageDiff}</strong></div>
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
          <p>
            
             {state === calcData.vic ? ( 
              <p>
              The estimated annual cost is {averageSpend}. {includes12months} These prices are based on a residential customer who uses <strong>{rates.energyConsumed}</strong> per year on a <strong>{rates.tariffName}</strong> tariff in the <strong>{distributor}</strong> network. Your actual bill will vary based on your usage and tariff. If you have a different tariff type, such as a Time of Use Tariff, view your 
                <Fragment>
                  <a href="/vefs/">
                    <strong> Energy Fact Sheet</strong>
                  </a>. 
                
                </Fragment>
                </p>
              ) : (
              <p>
              The estimated annual cost is {averageSpend}. {includes12months} These prices are based on a residential customer who uses   <strong>{rates.energyConsumed}</strong> per year on a <strong>{rates.tariffName}</strong> tariff in the <strong>{distributor}</strong> network. Your actual bills will vary depending on your usage and any price changes in the future – you'll be notified of any change in accordance with our regulatory requirements. This is an ongoing contract (until you or we end it) with no exit fees. If you have a different tariff type, such as a Time of Use Tariff, view your 
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
          <div className="u-font-h4">
            <ul className="kogan-benefits">
              <li>
                {K1Benefit}
              </li>
              <li>
                Great customer service
              </li>
              <li>
                Easy to use app
              </li>
            </ul>
          </div>
          <hr /> 
            <KoganBrandedButton
                  className="btn-centered btn-bold kogan-join-now"
                  iconName="kgnArrowRight"
                  labelText="JOIN NOW"
                  onClick={onClickJoinNow}
                    />
                          <br></br>

      {!showCC &&
        <fragment>
        <p>
              By clicking ‘Join Now’ and signing up to Kogan Energy, you agree to the Kogan First terms and conditions and Powershop providing your personal information to Kogan to register your Kogan First membership. By entering your details, even if you don't complete the form, you consent to Kogan Energy contacting you (including by calling you) to see if it can help you complete your signup to an energy contract.
                </p>
        <div className="u-font-h4">
            <ul className="kogan-benefits">
              <p>
                <strong>Kogan First Benefits:</strong>
                </p>
                <li>
                  Earn Kogan Rewards
                </li>
                <li>
                  Free Shipping
                </li>
                <li>
                  Exclusive Member Specials
                </li>
                <li>
                  Priority Customer Service 
                </li>
            </ul>
          </div>
          </fragment>
        }
            <hr />
          {!showCC &&
              <fragment>
              <p>
              *You receive a complimentary <a href="https://www.kogan.com/au/kogan-first/" target="_blank" rel="nofollow noopener">Kogan First</a> membership for 12 months from when you switch to Kogan Energy. <a href="https://www.kogan.com/au/kogan-first-terms-conditions/" target="_blank">Kogan First Terms & Conditions available here</a>. After the initial 12 months, you’ll be charged the then current Kogan First membership annual fee which currently is $99 (incl GST). Membership fees subject to change. Offer not available to existing Kogan First members. 
            </p>
            </fragment>
          }
          {showCC &&
              <fragment>
              <p> By clicking ‘Join Now’ and entering your details, even if you don’t complete the form, you consent to Kogan Energy contacting you (including by calling you) to see if it can help you complete your signup to an energy contract.
                </p>
              <p>
              A one-off $99 (incl GST) sign up credit will be applied to your Kogan Energy account on your first electricity bill.
            </p>
            </fragment>
          }
              {state === calcData.vic ? (
                <div>
                <p>
              Ongoing contract, until you or we end it. Your bills will vary depending on your usage, rates and any price changes in the future. The estimate doesn’t include concessions or other rebates, distributor service order costs, fees or, for electricity, solar feed in tariffs that may apply to you. 
              </p>
              <p>
                You may also be able to access our standing offer, including the Victorian Default Offer. For more information, please call 1300 005 123.
              </p>
              <p>
                We may have other generally available offers that may be more suitable for you. Please call us if you want to discuss.
              </p>
                </div>
              ) : (
                <div>
                <br></br>
                <p>
              Ongoing contract, until you or we end it. Your bills will vary depending on your usage, rates and any price changes in the future. The estimate doesn’t include concessions or other rebates, distributor service order costs, fees or, for electricity, solar feed in tariffs that may apply to you.
              </p>
              <p>
                You may also be able to access our standing offer. For more information, please call 1300 005 123.
              </p>
              <p>
                We may have other generally available offers that may be more suitable for you. Please call us if you want to discuss.
              </p>
              </div>
              )}
        </Fragment>
      ) : (
        <Fragment>
        <Fragment>
        <div className="kogan-estimate">
            <div className="u-font-p1"><strong>Pay an estimated</strong></div>
            <div className="u-font-h3">
              {rates.annualSpend} per year
            </div>
            <div className="u-font-p2 secondary">All prices quoted include GST</div>
          </div>
          {state === calcData.vic ? (
          <p>
            The estimated annual cost is {rates.annualSpend}. 
            {showCC &&
            <Fragment>
                this includes a one-off $99 (incl GST) sign up credit.
            </Fragment>
          } These prices are based on a residential customer who uses <strong>{rates.energyConsumed}</strong> per year on
            a <strong>Single Rate tariff</strong> in the <strong>{distributor}</strong> network. Your actual bill will vary based on your usage. View your <strong><a href="/vefs/" target="_blank" rel="nofollow noopener">Energy Fact Sheet</a></strong>. 
          </p>
          ) : (
          <p>
            The estimated annual cost is {rates.annualSpend}. {showCC &&
            <Fragment>
                this includes a one-off $99 (incl GST) sign up credit.
            </Fragment>
          } These prices are based on a residential customer who uses <strong>{rates.energyConsumed}</strong> per year on
            a <strong>Single Rate tariff</strong> in the <strong>{distributor}</strong> network. Your actual bill will vary based on your usage. View your <strong><a href="/basic-plan-information/" target="_blank" rel="nofollow noopener">Basic Plan Information</a></strong>. 
            
          </p>

          )}
          <hr />
          <div className="u-font-h4">
            <ul className="kogan-benefits">
              <li>
                Great customer service
              </li>
              <li>
                Easy to use app
              </li>
            </ul>
          </div>
          <hr />
            <KoganBrandedButton
                    className="btn-centered btn-bold kogan-join-now"
                    iconName="kgnArrowRight"
                    labelText="JOIN NOW"
                    onClick={onClickJoinNow}
                      />
          <br></br>
          <p> By clicking 'Join Now' and entering your details, even if you don't complete the form, you consent to Kogan Energy contacting you (including by calling you) to see if it can help you complete your signup to an energy contract.</p>
              <p> By clicking ‘Join Now’ and signing up to Kogan Energy, you agree or have agreed to the Kogan First terms and conditions and Powershop providing your personal information to Kogan to register your Kogan First membership.
                </p>
          <hr />
          <div className="u-font-h4">
            <ul className="kogan-benefits">
            <div>
                <p>
                <strong>Kogan First Benefits:</strong>
                </p>
                <li>
                Earn Kogan Rewards
              </li>
              <li>
                Free Shipping
              </li>
              <li>
                Exclusive Member Specials
              </li>
              <li>
                Priority Customer Service 
              </li>
                </div>
            <hr />
            <p>
            {includes12months}
            </p>
                <p>
              Ongoing contract, until you or we end it. The estimates don’t include concessions or other rebates, distributor service order costs, fees or, for electricity, solar feed in tariffs that may apply to you. Gas is only available in conjunction with electricity.
              </p>
              <p>
                You may also be able to access our standing offer. For more information, please call 1300 005 123.
              </p>
              <p>
                We may have other generally available offers that may be more suitable for you. Please call us if you want to discuss.
              </p>
              <p>
              Gas only available in conjunction with electricity
              </p>
            </ul>
          </div> 
        </Fragment>
      </Fragment>
      )}
    </div>
  );
};

SwitchAppResidentialInfo.propTypes = {
  rates: PropTypes.shape({}).isRequired,
  fuelType: PropTypes.string.isRequired,
  distributor: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  showSolar: PropTypes.bool,
  showCC: PropTypes.bool,
  onClickJoinNow: PropTypes.func.isRequired,
};

SwitchAppResidentialInfo.defaultProps = {
  showSolar: false,
  showCC: false,
};

export default SwitchAppResidentialInfo;
