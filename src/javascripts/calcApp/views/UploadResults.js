import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import cx from "classnames";
import Cookies from "js-cookie";

// Components
import * as Icons from "../components/Icons";
import Header from "../components/Header";
import LayoutContainer from "../components/LayoutContainer";
import TextLink from "../components/TextLink";
import UserMessage from "../components/UserMessage";


class UploadResults extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }

  renderSuccess = () => {

    // function to display form
    function showFormComparison() {
      const ocrForm = document.getElementsByClassName('resi-form');
      ocrForm[0].classList.remove('u-hidden-visually');

      // replace value 
      const toolUsed = document.getElementById('input_7');
      toolUsed.value = 'OCR';
    }

    showFormComparison();

    function cookieCheck() {
      
      if( document.cookie.match(/^(.*;)?\s*promo-id\s*=\s*[^;]+(.*)?$/) ) { 
        // don't touch cookies and change 100 credit div class
        document.body.classList.add('no-credit');
      } else {
        // change to OCR promo cookies
        Cookies.set('promo-id', '771');
        Cookies.set('promo-terms-url', '/ocr-terms-and-conditions/');
      }
    }

    cookieCheck();

    // functiuon to scroll to form
    function scrollToForm() {
      const ocrForm = document.getElementsByClassName('resi-form-comparison')[0];
      ocrForm.scrollIntoView({behavior: "smooth", block: "center"});
    }
    
    const { uploadData, handleStartAgain } = this.props;

    let { total_saving: totalSaving } = uploadData;
    const { days, downloadLink } = uploadData;

    const isSaving = totalSaving < 0;

    // Flip the negative number if needed
    totalSaving = Math.abs(totalSaving).toFixed(2);

    return (
      <Header
        title={isSaving ? "Great news!" : `It's a close call.`}
        lessBottomSpacing
      >
        <div
          className={cx("c-results-text", {
            "c-results-text--bad-result": !isSaving,
          })}
        >
          <p className="c-results-text__intro">
            Based on the bill you uploaded you would have
          </p>

          <p className="c-results-text__price">
            {isSaving ? "saved" : "paid an extra"}
            <span>${totalSaving}</span>
          </p>

          <p className="c-results-text__terms">
            over the same time period
            <small>(Comparison period: {days} days)</small>
          </p>

          <hr />

          <div class="o-grid-layout o-grid-layout--columns-2-half-half">
            <TextLink
              icon={<Icons.File />}
              text="Detailed PDF comparison"
              link={downloadLink}
            />

            <TextLink
              icon={<Icons.Zap />}
              text="Compare another bill"
              onClick={handleStartAgain}
            />
          </div>

          <p className="c-ocr-credit o-grid-layout o-grid-layout o-grid-layout--columns-2-half-half">
            <div class="o-flex-layout o-flex-layout--vertical o-flex-layout--vertical-space-evenly">
              <h4 className="c-ocr-header e-colour--pink">$100 discount on sign up</h4>
              <a href="/switch-now" className="c-ocr__btn c-ocr-credit--margin-none c-btn c-btn--icon-right c-btn--blue c-btn--full@mobile c-btn--join c-btn--join-get-price c-btn--join-ocr">
                Join now
                <svg width="500px" height="550px" viewBox="0 0 500 550" xmlns="http://www.w3.org/2000/svg">
                  <path d="M497.9,239.4c-1.4-3.4-3.4-6.5-6-9L325.2,63.7c-10.8-10.8-28.5-10.8-39.3,0s-10.8,28.5,0,39.3l119.2,119.2H27.8 C12.4,222.2,0,234.7,0,250c0,15.3,12.4,27.8,27.8,27.8h377.4L285.9,397c-10.8,10.8-10.8,28.5,0,39.3s28.5,10.8,39.3,0l166.7-166.7 c2.6-2.6,4.6-5.6,6-9C500.7,253.8,500.7,246.2,497.9,239.4z" />
                </svg>
              </a>
            </div>
            <div className="c-image--ocr-credit-svg o-flex-layout">
              <Icons.OCRCredit />
            </div>
          </p>
          <div className="u-spacing-bottom-medium"></div>

          <div className="o-grid-layout o-grid-layout--columns-2-half-half">
            <TextLink
              icon={<Icons.File />}
              text="View Basic Plan Information"
              link="/basic-plan-information"
              className="c-text-link--grey-dark"
            />

            <TextLink
              icon={<Icons.ChevronDownSmall />}
              text="Want to know more?"
              onClick={scrollToForm}
              className="c-text-link--grey-dark"
            />
          </div>
        </div>
      </Header>
    );
  };

  renderError = () => {
    const { uploadErrorMessage, handleStartAgain } = this.props;

    return (
      <Fragment>
        <Header title="Uh oh!" lessBottomSpacing />
        <UserMessage
          title="We couldn't complete your bill comparison"
          text={uploadErrorMessage}
        />
        <TextLink
          icon={<Icons.Zap />}
          text="Start over"
          onClick={handleStartAgain}
          className="u-margin-bottom-medium"
        />
      </Fragment>
    );
  };

  render() {
    const { uploadData, uploadErrorMessage } = this.props;

    if (!uploadData) {
      return <Redirect to="/" />;
    }

    return (
      <LayoutContainer>
        <div className="o-layout__item  u-8/12@tablet  u-6/12@wide">
          {uploadErrorMessage ? this.renderError() : this.renderSuccess()}
        </div>
      </LayoutContainer>
    );
  }
}

UploadResults.propTypes = {
  uploadData: PropTypes.shape({}).isRequired,
  handleStartAgain: PropTypes.func.isRequired,
  uploadErrorMessage: PropTypes.string,
};

UploadResults.defaultProps = {
  uploadErrorMessage: null,
};

export default UploadResults;
