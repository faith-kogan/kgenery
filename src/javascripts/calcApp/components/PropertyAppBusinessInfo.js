import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Data
import * as calcData from "../data/calcData";
import Button from "../components/Button";
import Tooltip from "../components/Tooltip";

const tooltipVDO = `
The Victorian Default Offer is a set of rates 
set by the Essential Services Commission (ESC) 
which we are required to compare our Market Offer against.`;

const tooltipBPID = `
All energy retailers 
in NSW, QLD and SA to compare their Market Offer 
against the Default Market Offer. 
The Default Market Offer is a maximum annual price 
retailers can charge a Standing Offer customer 
based on an average customer’s usage, tariff and 
distribution area and is referred to as the reference price.`;

const tooltipSolarExplain = `
If you have solar energy, you'll get a Feed-in Tariff that’s 
higher than the government recommended minimum and slick usage 
tools that track the solar export of panels in half-hourly 
increments (plus much more).`;

// Powerpacks offer styles
const powerpackStyleMegaPack = {
  backgroundColor: '#113651',
}

const powerpackStylePowerSaver = {
  backgroundColor: '#FA0E6A',
}

const PropertyAppResidentialInfo = props => {
  const {
    rates,
    fuelType,
    distributor,
    state,
    onClickJoinNow,
  } = props;


return (

<div className="c-pre-signup">

{fuelType === "electricity" ? (
// ELECTRICITY TAB CONTENT
<Fragment>
{/* SECTION: ESTIMATED */}
  <section className="o-layout--center c-cro__section-estimated">
    <p className="u-margin-bottom-base c-cro__section-estimated-note stagger-element-estimate">Based on your postcode, you can signup to our offer:</p>
    
    <div className="o-flex-layout o-flex-layout--center-all u-margin-bottom-base stagger-element-estimate">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70">
        <path fill="#fa0e6a" stroke="#fa0e6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M38.3 1.667l-33.3 40h30l-3.3 26.7 33.3-40H35z"/>
      </svg>
      <p className="u-font-h4 u-margin-bottom-zero">Powershop Shopper</p>
    </div>
    
    <p className="u-margin-bottom-small stagger-element-estimate">Where you will pay an estimated</p>
    <p className="c-cro__section-estimated-amount stagger-element-estimate" data-autopay-amount={rates.annualPriceAutopay} data-autopay-more={rates.autopayMore}>
      <span className="dollar">$</span>
      <span id="autopay_amount">{new Intl.NumberFormat().format(rates.annualPriceAutopay)}</span>&nbsp;per year
    </p>
    <p className="c-cro__section-estimated-gst stagger-element-estimate">(incl. GST)</p>

    <p className="c-cro__section-estimated-percent stagger-element-estimate">That's <strong>{rates.percentOffAutopay}%</strong> {rates.compareAutopay}&nbsp;
    {state === calcData.vic ? (
      <Tooltip name="the&nbsp;Victorian&nbsp;Default&nbsp;Offer" content={tooltipVDO}/>
    ) : (
      <Tooltip name="the&nbsp;reference&nbsp;price" content={tooltipBPID}/>
    )}
    </p>
    <div className="c-box c-box--trigger stagger-element-estimate">
      <p className="u-margin-bottom-zero">Estimated cost and comparison using {rates.energyConsumed} on a Single rate tariff in the {distributor} network.</p>
    </div>
    <div className="o-grid-layout o-grid-layout--join">
    </div>
  </section>
{/* SECTION: USPS */}

{/* SECTION: JOIN BUTTONS */}

<div className="timeline-bottom u-relative">
{/* SECTION: OFFER DETAILS */}
  <section className="c-form c-form--bordered c-cro__section-offer-details">
    <div className="c-cro__section-offer-details-header o-flex-layout o-flex-layout--justify-space-between accordion-header">
      <p className="u-margin-bottom-zero">Offer details</p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M20 30.8c-.7 0-1.4-.3-1.9-.8L2.2 13.8c-1-1.1-1-2.8 0-3.8S5 8.9 6 10l14 14.3L34 10c1-1.1 2.7-1.1 3.7 0s1 2.8 0 3.8L21.9 30c-.5.6-1.2.8-1.9.8z"/></svg>
    </div>
    <div id="pack_offer_scroll" className="c-cro__section-offer-details-footer accordion-footer">
      <table className="c-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Single rate tariff</td>
            <td>{rates.tariffRateAutopay} c/kWh</td>
          </tr>
          <tr>
            <td>Daily supply charge</td>
            <td>{rates.dailySupplyAutopay} c/day</td>
          </tr>
          <tr>
            <td>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70">
              <path fill="#fa0e6a" d="M33.7 11.1c-1.4 0-2.5-1.1-2.5-2.5V3c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v5.6c0 1.4-1.2 2.5-2.5 2.5zM33.7 66.8c-1.4 0-2.5-1.1-2.5-2.5v-5.6c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v5.6c0 1.4-1.2 2.5-2.5 2.5zM15.9 18.4c-.6 0-1.3-.2-1.8-.7l-4-4c-1-1-1-2.6 0-3.5 1-1 2.6-1 3.5 0l4 4c1 1 1 2.6 0 3.5-.4.5-1 .7-1.7.7zM55.4 57.9c-.6 0-1.3-.2-1.8-.7l-4-4c-1-1-1-2.6 0-3.5s2.6-1 3.5 0l4 4c1 1 1 2.6 0 3.5-.5.4-1.1.7-1.7.7zM8.6 36.2H3c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5h5.6c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM64.3 36.2h-5.6c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5h5.6c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5zM12 57.9c-.6 0-1.3-.2-1.8-.7-1-1-1-2.6 0-3.5l4-4c1-1 2.6-1 3.5 0 1 1 1 2.6 0 3.5l-4 4c-.4.4-1.1.7-1.7.7zM51.4 18.4c-.6 0-1.3-.2-1.8-.7-1-1-1-2.6 0-3.5l4-4c1-1 2.6-1 3.5 0 1 1 1 2.6 0 3.5l-4 4c-.4.5-1.1.7-1.7.7z" transform="translate(3.333 3.333)"/>
              <circle fill="#fa0e6a" cx="35" cy="35" r="13.8"/>
            </svg>
             Solar feed-in tariff</td>
            <td>{rates.solarFeed}</td>
          </tr>
        </tbody>
      </table>
      <p>Sign up and you'll also get access to the Powershop Shop</p>
      <ul>
        <li>Where you can grab more savings by purchasing Powerpacks.</li>
        <li>Buy discounted Powerpacks to cover your usage and save.</li>
        <li>There are lots of different Powerpacks to choose from.</li>
      </ul>
    </div>
  </section>
  <hr />
{/* Disclaimer info */}
<p id="section_details">Ongoing contract, until you or we end it. The estimates above are based on an average residential customer. We have calculated the monthly estimates based on the annual figure and divided by 12. Your actual bills will vary depending on your usage, rates and any price changes in the future. The Powerpack estimates are also based on you purchasing the Powerpack to cover your annual usage. The discounts on our Powerpacks are subject to change from time to time. The estimates don’t include concessions or other rebates, distributor service order costs, fees or, for electricity, solar feed in tariffs that may apply to you.</p>

{state === calcData.vic ? (
    <Fragment>
    <p>View your <a id="cro_new_vefs" target="_blank" href="/vefs/">Energy Fact Sheet</a>.</p>
    <p>You may also be able to access our standing offer, including the Victorian Default Offer. For more information on our standing offer and Victorian Default offer, please call <a href="tel:1800-462-668" target="_blank">1800 462 668</a>.</p>
    <p>We may have other generally available offers that may be more suitable for you. Please <a href="tel:1800-462-668" target="_blank">call us</a> if you want to discuss.</p>
    </Fragment>
  ) : (
    <Fragment>
    <p>View your <a id="cro_new_bpids" target="_blank" href="/basic-plan-information/">Basic Plan Information</a>.</p>
    <p>You may also be able to access our standing offer. For more information on our standing offer, please call <a href="tel:1800-462-668" target="_blank">1800 462 668</a>.</p>      
    </Fragment>
  )}
  {/* Refactor code now that all variables are same for each state */}
  <div className="c-cro__section-faqs"></div>

  </div>
</Fragment>

// end fuel type electricity

) : (

// GAS TAB CONTENT
        <Fragment>
          <div className="o-grid-layout o-layout--center c-cro__section-estimated">
            <p className="u-margin-bottom-base c-cro__section-estimated-note stagger-element-estimate">Based on your postcode, you can signup to our offer:</p>
            <div className="o-flex-layout o-flex-layout--center-all u-margin-bottom-base stagger-element-estimate">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70">
                <path fill="#1390CE" className="st0" d="M57.8,46.6c0,10.1-5.1,18.2-13.4,21.4c2.2-2.3,3.5-6.5,3.8-13c0.5-12-10.6-20.6-10.6-20.6c1,11-4,19.1-4,19.1
                C32.6,47.1,29,45,29,45c-0.5,3.5-3,8.1-3,8.1c-3.4,7.7-0.8,12.4,1.4,14.7c-8.1-2.7-14-9.5-15.1-18.5c-0.6-7,2.4-13.3,3-14.6
                c1-2,2.2-3.7,3-4.8c0.4-0.5,0.8-1,1.3-1.6c4.6-6.2,12.1-18.2,12-27.5c0,0,3.3,2.4,7.6,7C58.5,28.1,57.8,46.6,57.8,46.6z"/>
              </svg>
              <p className="u-font-h4 u-margin-bottom-zero">Powershop Gas</p>
            </div>

            <p className="u-margin-bottom-small stagger-element-estimate">Where you will pay an estimated</p>
            <p className="c-cro__section-estimated-amount stagger-element-estimate">
              <span className="dollar">$</span>
              <span id="autopay_amount">{rates.annualSpend}</span>&nbsp;per year
            </p>
            <p className="c-cro__section-estimated-gst stagger-element-estimate">(incl. GST)</p>
            <p className="u-margin-bottom-zero">when you purchase Gas Mega Packs</p>
          </div>

          <hr />

          <div className="c-cro__section-details">
            <p>
              Buy the Gas Mega Pack or Gas Saver to cover your usage before your bill is due.&nbsp;
              Sign up to this offer to get access to these Powerpacks and more.
            </p>
            <p>
              These prices are based on an average customer who uses&nbsp;
              <strong>{rates.energyConsumed}</strong> per year on a&nbsp;
              <strong>Single Rate tariff</strong> in the&nbsp;
              <strong>{distributor}&nbsp;</strong>network. Your actual bill will vary based&nbsp;
              on your usage. View your&nbsp;
              {state === calcData.vic ? (
                <Fragment>
                  <a id="cro_new_vefs" target="_blank" href="/vefs/">Energy Fact Sheet</a>.
                </Fragment>
              ) : (
                <Fragment>
                  <a id="cro_new_bpids" target="_blank" href="/basic-plan-information/">Basic Plan Information</a>.
                </Fragment>
              )}
            </p>
          </div>
        </Fragment>
      )}
    </div>
  );
};

PropertyAppResidentialInfo.propTypes = {
  rates: PropTypes.shape({}).isRequired,
  fuelType: PropTypes.string.isRequired,
  distributor: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  onClickJoinNow: PropTypes.func.isRequired,
};

export default PropertyAppResidentialInfo;
