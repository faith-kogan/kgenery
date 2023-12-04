import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Data
import * as calcData from "../data/calcData";
import Button from "../components/Button";
import Tooltip from "../components/Tooltip";

const SwitchAppBusinessInfo = props => {
  const {
    rates,
    fuelType,
    distributor,
    state,
    showSolar,
    onClickJoinNow,
  } = props;

  return (
    <div className="s-cms-content ">
      {fuelType === "electricity" ? (
        <Fragment>
          <div className="o-grid-layout o-grid-layout--columns-2-auto-width">
            <p className="u-font-h4">
              Pay an estimated{" "}
              <span className="e-colour--pink">
                {rates.averageCost} per year
              </span>{" "}
              when you purchase Mega Packs
            </p>
            <div className="o-flex-layout o-flex-layout--vertical o-flex-layout--vertical-center">
              <Button
                element="button"
                marginBase
                joinNow
                joinNowAbove
                centered
                full
                pink
                type="button"
                onClick={onClickJoinNow}
              >
                Join now
              </Button>
            </div>
          </div>

          {/* Content for new design */}
          <hr />
          <p className="u-font-p1 c-switch-app__offer-heading">
            Electricity offer details
          </p>

          {/* Powerpack savings section */}
          <article className="o-grid-layout c-switch-app-packs-grid">
            <header>
              <div className="o-grid-layout c-switch-app-packs-grid__inner">
                <a href="/powerpacks">
                  <img
                    src="https://s3-ap-southeast-2.amazonaws.com/psau-wordpress/wp-content/uploads/2018/07/05061814/PowerPack-MegaPack-FA.png"
                    alt=""
                  />
                </a>
                <div>
                  {/* Conditional if percentage is 0% */}
                  {rates.sameAsMega != null ? (
                    <p>
                      <strong>
                        Access the <a href="/powerpacks">Mega Pack</a> to pay
                        the same as&nbsp;
                      </strong>
                      {state === calcData.vic ? (
                        <Fragment>
                          <Tooltip
                            name="distributorNameTip"
                            content="The Victorian Default Offer is a set of rates set by the Essential Services Commission (ESC) which we are required to compare our Market Offer against."
                          />
                          <strong>the Victorian Default Offer.</strong>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <Tooltip
                            name="distributorNameTip"
                            content="The Federal government requires all energy retailers in NSW, QLD and SA to compare their Market Offer against the Default Market Offer. The Default Market Offer is a maximum annual price retailers can charge a Standing Offer customer based on an average customer’s usage, tariff and distribution area and is referred to as the reference price."
                          />
                          <strong>the reference price.</strong>
                        </Fragment>
                      )}
                    </p>
                  ) : (
                    <span>
                      <p className="c-switch-app--packs-para">
                        <strong>
                          Access the <a href="/powerpacks">Mega Pack</a> for
                        </strong>
                      </p>
                      <div className="o-grid-layout c-switch-app--grid__inner-percent">
                        <div className="c-rates-percent">
                          {rates.percentageOffMegaPack}
                        </div>
                        <div className="o-flex-item--vertical-center">
                          {rates.lessMoreMegaPack}&nbsp;&nbsp;
                          {state === calcData.vic ? (
                            <Fragment>
                              <Tooltip
                                name="distributorNameTip"
                                content="The Victorian Default Offer is a set of rates set by the Essential Services Commission (ESC) which we are required to compare our Market Offer against."
                              />
                              the Victorian Default Offer
                            </Fragment>
                          ) : (
                            <Fragment>
                              <Tooltip
                                name="distributorNameTip"
                                content="The Federal government requires all energy retailers in NSW, QLD and SA to compare their Market Offer against the Default Market Offer. The Default Market Offer is a maximum annual price retailers can charge a Standing Offer customer based on an average customer’s usage, tariff and distribution area and is referred to as the reference price."
                              />
                              the reference price
                            </Fragment>
                          )}
                        </div>
                      </div>
                    </span>
                  )}
                </div>
              </div>
            </header>
            <p className="c-switch-app-rounded">and</p>
            <footer>
              <div className="o-grid-layout c-switch-app-packs-grid__inner">
                <a href="/powerpacks">
                  <img
                    src="https://s3-ap-southeast-2.amazonaws.com/psau-wordpress/wp-content/uploads/2018/07/05061753/PowerPack-PowerSaver-FA.png"
                    alt=""
                  />
                </a>
                <div>
                  {/* Conditional if percentage is 0% */}
                  {rates.sameAsPower != null ? (
                    <p>
                      <strong>
                        Access the <a href="/powerpacks">Power Saver</a>
                      </strong>&nbsp;
                      {state === calcData.vic ? (
                        <Fragment>
                          <strong>
                            to pay the same as the Victorian Default Offer.
                          </strong>
                          <Tooltip
                            name="distributorNameTip"
                            content="The Victorian Default Offer is a set of rates set by the Essential Services Commission (ESC) which we are required to compare our Market Offer against."
                          />
                        </Fragment>
                      ) : (
                        <Fragment>
                          <strong>
                            to pay the same as the reference price.
                          </strong>
                          <Tooltip
                            name="distributorNameTip"
                            content="The Federal government requires all energy retailers in NSW, QLD and SA to compare their Market Offer against the Default Market Offer. The Default Market Offer is a maximum annual price retailers can charge a Standing Offer customer based on an average customer’s usage, tariff and distribution area and is referred to as the reference price."
                          />
                        </Fragment>
                      )}
                    </p>
                  ) : (
                    <span>
                      <p className="c-switch-app--packs-para">
                        <strong>
                          Access the <a href="/powerpacks">Power Saver</a> for
                        </strong>
                      </p>
                      <div className="o-grid-layout c-switch-app--grid__inner-percent">
                        <div className="c-rates-percent">
                          {rates.percentageOffPowerPack}
                        </div>
                        <div className="o-flex-item--vertical-center">
                          {rates.lessMorePowerPack}&nbsp;&nbsp;
                          {state === calcData.vic ? (
                            <Fragment>
                              <Tooltip
                                name="distributorNameTip"
                                content="The Victorian Default Offer is a set of rates set by the Essential Services Commission (ESC) which we are required to compare our Market Offer against."
                              />
                              the Victorian Default Offer
                            </Fragment>
                          ) : (
                            <Fragment>
                              <Tooltip
                                name="distributorNameTip"
                                content="The Federal government requires all energy retailers in NSW, QLD and SA to compare their Market Offer against the Default Market Offer. The Default Market Offer is a maximum annual price retailers can charge a Standing Offer customer based on an average customer’s usage, tariff and distribution area and is referred to as the reference price."
                              />
                              the reference price
                            </Fragment>
                          )}
                        </div>
                      </div>
                    </span>
                  )}
                </div>
              </div>
            </footer>
          </article>
          <hr />
          {/* Refactor code now that all variables are same for each state */}
          <div>
            <p>
              Buy Mega Pack or Power Saver to cover your usage before your bill
              is due.&nbsp; Sign up to this offer to get access to these
              Powerpacks and more.
            </p>
            {state === calcData.vic ? (
            <Fragment>
            <p>
              If you don&apos;t purchase discounted Powerpacks&nbsp;
              your estimated annual spend will be <strong>{rates.annualSpendComparison}</strong> the&nbsp;
              Victorian Default Offer.
            </p>
            </Fragment>
              ) : (
            <Fragment>
            <p>
              If you don&apos;t purchase discounted Powerpacks your estimated
              annual spend will be&nbsp;
              <strong>{rates.annualSpend}</strong> (Powershop’s Auto Pay rates)
              which is&nbsp;
              <strong>{rates.annualSpendComparison}</strong> the&nbsp;  
              reference price.
            </p>  
            </Fragment>
            )}
            <p>
              These prices are based on an average customer who uses&nbsp;
              <strong>{rates.energyConsumed}</strong> per year on a&nbsp;
              <strong>Single Rate tariff</strong> in the&nbsp;
              <strong>{distributor}</strong> network.&nbsp; Your actual bill
              will vary depending on your usage and tariff.&nbsp; If you have a
              different tariff type, such as a Time of Use tariff, view
              your&nbsp;
              {state === calcData.vic ? (
                <Fragment>
                  <strong>
                    <a href="/vefs/">Energy Fact Sheet</a>
                  </strong>.
                </Fragment>
              ) : (
                <Fragment>
                  <strong>
                    <a href="/basic-plan-information/">
                      Basic Plan Information
                    </a>
                  </strong>.
                </Fragment>
              )}
            </p>
            <p>
              <a href="/powerpacks">Learn more about Powerpacks</a>
            </p>
            <p>
              <small>All prices quoted include GST.</small>
            </p>

            {/* If solar is checked, render here */}
            {showSolar && 
            <div>
            <hr />
              <p className="u-font-p1 c-switch-app__offer-heading">
                Solar
              </p>
              <div className="o-grid-layout o-grid-layout--columns-2-form-radio o-grid-layout--gap-base">
                <div>
                  <img className="c-switch-app--solar-icon" src="https://s3-ap-southeast-2.amazonaws.com/psau-wordpress/wp-content/uploads/2019/07/18114522/sun.png" />
                </div>
                <div>
                  <p className="u-margin-bottom-zero c-switch-app--solar-rates">
                    <strong>Solar feed-in tariff</strong><br />
                    {rates.solarFeed}
                  </p>
                </div>
              </div>
            </div>
            }
          </div>
          <hr />
          <Button
            element="button"
            marginBase
            joinNow
            joinNowAbove
            centered
            full
            pink
            type="button"
            onClick={onClickJoinNow}
          >
            Join now
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <div className="o-grid-layout o-grid-layout--columns-2-auto-width u-hidden-visually">
            <p className="u-font-h4">
              Pay an estimated{" "}
              <span className="e-colour--blue">
                {rates.annualSpend} per year
              </span>{" "}
              when you purchase Mega Packs
            </p>
            <div className="o-flex-layout o-flex-layout--vertical o-flex-layout--vertical-center">
              <Button
                element="button"
                marginBase
                joinNow
                joinNowAbove
                centered
                full
                pink
                type="button"
                onClick={onClickJoinNow}
              >
                Join now
              </Button>
            </div>
          </div>

          <hr />
          <p className="u-font-p1 c-switch-app__offer-heading">
            Gas offer details
          </p>

          {/* Powerpacks saving section */}
          <article className="o-grid-layout c-switch-app-packs-grid">
            <header>
              <div className="o-grid-layout c-switch-app-packs-grid__inner">
                <a href="/powerpacks">
                  <img
                    src="https://s3-ap-southeast-2.amazonaws.com/psau-wordpress/wp-content/uploads/2019/07/18111439/megapack2.png"
                    alt=""
                  />
                </a>
                <div>
                  <p className="c-switch-app--packs-para">
                    <strong>
                      Access the <a href="/powerpacks">Mega Pack</a> for
                    </strong>
                  </p>
                  <div className="o-grid-layout c-switch-app--grid__inner-percent">
                    <div className="c-rates-percent">8%</div>
                    <div className="o-flex-item--vertical-center">
                      off Auto pay rates
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <p className="c-switch-app-rounded">and</p>
            <footer>
              <div className="o-grid-layout c-switch-app-packs-grid__inner">
                <a href="/powerpacks">
                  <img
                    src="https://s3-ap-southeast-2.amazonaws.com/psau-wordpress/wp-content/uploads/2019/07/11150354/gas-saver.png"
                    alt=""
                  />
                  </a>
                <div>
                  <p className="c-switch-app--packs-para">
                    <strong>
                      Access the <a href="/powerpacks">Power Saver</a> for
                    </strong>
                  </p>
                  <div className="o-grid-layout c-switch-app--grid__inner-percent">
                    <div className="c-rates-percent">5%</div>
                    <div className="o-flex-item--vertical-center">
                      off Auto pay rates
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </article>
          <hr />

          <div>
            <p>
              Buy the Gas Mega Pack or Gas Saver to cover your usage before your bill is due.&nbsp;
              Sign up to this offer to get access to these Powerpacks and more.
            </p>
            <p>
              View your&nbsp;
              {state === calcData.vic ? (
                <Fragment>
                  <a href="/vefs/">
                    <strong>Energy Fact Sheet</strong>
                  </a>.
                </Fragment>
              ) : (
                <Fragment>
                  <a href="/basic-plan-information/">
                    <strong>Basic Plan Information</strong>
                  </a>.
                </Fragment>
              )}
            </p>
            <p>
              <a href="/powerpacks">Learn more about Powerpacks</a>
            </p>
            <p>
              <small>All prices quoted include GST.</small>
            </p>
          </div>
          <hr />
          <Button
            element="button"
            marginBase
            joinNow
            joinNowAbove
            centered
            full
            pink
            type="button"
            onClick={onClickJoinNow}
          >
            Join now
          </Button>
        </Fragment>
      )}
    </div>
  );
};

SwitchAppBusinessInfo.propTypes = {
  rates: PropTypes.shape({}).isRequired,
  fuelType: PropTypes.string.isRequired,
  distributor: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  showSolar: PropTypes.bool,
  onClickJoinNow: PropTypes.func.isRequired,
};

SwitchAppBusinessInfo.defaultProps = {
  showSolar: false,
};

export default SwitchAppBusinessInfo;
