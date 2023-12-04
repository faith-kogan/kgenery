import React, { Component } from "react";
import PropTypes from "prop-types";

// Utils
import * as Utils from "../utils";

// PropTypes
import { appStatePropType, appStateDefaultProps } from "../propTypes";

class PropertyPostcodeEntryField extends Component {
  state = {
    input: this.props.appState.postcode,
    error: null,
  };

  componentDidMount() {
    console.log('PropertyPostcodeEntryField mounted')

  }

  componentDidUpdate(prevProps) {

    console.log('PropertyPostcodeEntryField updated')

    if (prevProps.showError !== this.props.showError) {
      this.validatePostcode(this.state.input);
    }
  }

  isPostcodeServiceable = postcode => {
    const { bypassPostcodeServicabilityCheck, climateZoneOnly } = this.props;

    const isServiceablePostcode = climateZoneOnly
      ? Utils.isPostcodeWithClimateZone(postcode)
      : Utils.isServiceablePostcode(postcode);

    // No postcode? Get rid of the errors
    if (!postcode.length || isServiceablePostcode) {
      return true;
    }

    // Postcode isn't servicable, show the user an error
    if (
      !isServiceablePostcode &&
      postcode.length === 4 &&
      !bypassPostcodeServicabilityCheck
    ) {
      return false;
    }

    return true;
  };

  validatePostcode = postcode => {
    const { required } = this.props;

    const errorDiv = {
      display: "block",
      backgroundColor: "rgba(255, 221, 0, 0.1)",
      border: "1px solid rgb(255, 221, 0)",
      padding: "12px",
      borderRadius: "5px",
    };

    const fontStyle = {
      fontWeight: "600",
    };

    const customPostcodeMessage = (
      <span style={errorDiv}>
        Your postcode is in a region that could be serviced by two different
        states. The results below are for Victorian distributor{" "}
        <span style={fontStyle}>Powercor</span>. As we cannot confirm whether
        this is correct for your exact address, please contact us on <br />
        <span style={fontStyle}>
          <a href="tel:1800 462 668" target="_blank">
            1800 462 668
          </a>
        </span>{" "}
        and we’ll confirm the details for you.
      </span>
    );

    if (required && postcode.length === 0) {  
      this.handleError("This field is required");
    } else if (postcode.length === 4 && postcode === "3644") {
      this.handleError(customPostcodeMessage, false);
    } else if (!this.isPostcodeServiceable(postcode)) {
      this.handleError(
        "Sorry, we don't currently service the postcode you entered.",
        true
      );
    } else {
      this.handleError("");
    }
  };  

  handleChange = event => {
    const { handleChange } = this.props;
    const postcode = event.target.value;

    this.setState({ input: postcode });
    handleChange(postcode);
    this.validatePostcode(postcode);
  };

  handleError = (error, isNotServiceable = false) => {
    const { handleError } = this.props;
    handleError(error, isNotServiceable);

    return this.setState({
      error,
    });
  };

  handleSubmit = event => {
    const { state } = this;
    event.preventDefault();

    const { handleChange } = this.props;
    handleChange(state.input);
  };

  render() {
    const { state } = this;
    const { showError } = this.props;

    return (
      <div className="c-input u-margin-bottom-zero">
        <label className="c-input-label" htmlFor="postcode">
          Postcode
        </label>
        <div className="c-input__button-inside">
          <div>
            <input
              pattern="[0-9]*"
              type="text"
              className="c-input-text"
              name="postcode"
              id="postcode"
              maxLength={4}
              max={4}
              min={4}
              value={state.input}
              //value={localStorage.getItem('postcode')}
              onChange={this.handleChange}
              onKeyUp={e => {
                if (e.keyCode === 13) this.button.click();
              }}
              // placeholder="E.g. 3000"
            />
            <button
              id="button"
              type="submit"
              className="u-hidden-visually"
              onClick={this.handleSubmit}
              ref={c => {
                this.button = c;
              }}
              disabled={state.input.length !== 4 || !!state.error}
            >
              <span>Go</span>
            </button>
          </div>
        </div>
        {(showError || state.error) && (
          <small className="c-input__error no-gap e-colour--grey-dark">
            {state.error}
          </small>
        )}
      </div>
    );
  }
}

PropertyPostcodeEntryField.propTypes = {
  appState: PropTypes.shape(appStatePropType),
  handleChange: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  bypassPostcodeServicabilityCheck: PropTypes.bool,
  showError: PropTypes.bool,
  climateZoneOnly: PropTypes.bool,
  required: PropTypes.bool,
};

PropertyPostcodeEntryField.defaultProps = {
  appState: appStateDefaultProps,
  bypassPostcodeServicabilityCheck: false,
  showError: false,
  climateZoneOnly: false,
  required: false,
};

export default PropertyPostcodeEntryField;
