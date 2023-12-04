import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";

// Components
import * as Icons from "../components/Icons";

// Utils
import * as Utils from "../utils";

// PropTypes
import { appStatePropType, appStateDefaultProps } from "../propTypes";

class PostcodeEntry extends Component {
  state = {
    postcode: this.props.appState.postcode,
    terms: this.props.appState.terms,
    errors: {
      postcode: null,
      terms: null,
    },
  };

  updateInput = event => {
    const { handlePostcode, bypassPostcodeServicabilityCheck } = this.props;
    const postcode = event.target.value;

    this.setState({ postcode });

    const isServiceablePostcode = Utils.isServiceablePostcode(postcode);

    // If the user clears the field
    if (!postcode.length) {
      handlePostcode(postcode);
    }

    // No postcode? Get rid of the errors
    if (!postcode.length || isServiceablePostcode) {
      // @@TODO - better error handling
      return this.setState({
        errors: {
          ...this.state.errors,
          postcode: null,
        },
      });
    }

    // Postcode isn't servicable, show the user an error
    if (
      !isServiceablePostcode &&
      postcode.length === 4 &&
      !bypassPostcodeServicabilityCheck
    ) {
      return this.setState({
        errors: {
          ...this.state.errors,
          postcode: <Fragment>Sorry, we don&apos;t currently service the postcode you entered. <br />For more details, visit <a href="https://www.koganenergy.com.au/faq-join/" target="_blank" rel="nofollow noopener">our FAQ</a>.</Fragment>
        },
      });
    }

    return null;
  };

  /* eslint-disable consistent-return */
  handlePostcode = event => {
    event.preventDefault();

    const { appState } = this.props;

    if (appState.termsUrl && !this.state.terms) {
      return this.setState({
        errors: {
          ...this.state.errors,
          terms: "Please accept the terms and conditions",
        },
      });
    }

    const { handlePostcode } = this.props;
    handlePostcode(this.state.postcode);
  };
  /* eslint-enable consistent-return */

  handleTerms = event => {
    const terms = event.target.checked;

    this.setState({ terms });

    if (terms) {
      this.setState({
        errors: {
          ...this.state.errors,
          terms: null,
        },
      });
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          terms: "Please accept the terms and conditions",
        },
      });
    }
  };

  render() {
    const { state } = this;
    const { termsUrl } = this.props.appState;

    return (
      <div>
        <div className="c-input">
          <label
            className="c-input-label  c-input-label--with-icon"
            htmlFor="postcode"
          >
            <Icons.Home />
            Enter your postcode
          </label>
          {termsUrl && (
            <div className="c-input  c-input--centered">
              <div className="c-checkbox  c-checkbox--alt">
                <input
                  onChange={this.handleTerms}
                  className="c-checkbox__input"
                  id="terms"
                  type="checkbox"
                  checked={state.terms}
                />
                <label className="c-checkbox__label" htmlFor="terms">
                  <span>
                    I accept the&nbsp;
                    <a href={termsUrl} target="_blank">
                      terms and conditions
                    </a>&nbsp;of this promotion.
                  </span>
                </label>
              </div>
              {state.errors.terms && (
                <small className="c-input__error">{state.errors.terms}</small>
              )}
            </div>
          )}
          <div className="c-input__button-inside">
            <div>
              <input
                type="text"
                className="c-input-text"
                name="postcode"
                id="postcode"
                maxLength={4}
                max={4}
                min={4}
                onChange={this.updateInput}
                value={state.postcode}
                onKeyUp={e => {
                  if (e.keyCode === 13) this.button.click();
                }}
              />
              <button
                type="submit"
                onClick={this.handlePostcode}
                ref={c => {
                  this.button = c;
                }}
                disabled={
                  this.state.postcode.length !== 4 ||
                  !!state.errors.postcode ||
                  !!state.errors.terms
                }
              >
                <span className="u-hidden-visually">Go</span> <Icons.Search />
              </button>
            </div>
          </div>
          {state.errors.postcode && (
            <small className="c-input__error">{state.errors.postcode}</small>
          )}
        </div>
      </div>
    );
  }
}

PostcodeEntry.propTypes = {
  appState: PropTypes.shape(appStatePropType),
  handlePostcode: PropTypes.func.isRequired,
  bypassPostcodeServicabilityCheck: PropTypes.bool,
};

PostcodeEntry.defaultProps = {
  appState: appStateDefaultProps,
  bypassPostcodeServicabilityCheck: false,
};

export default PostcodeEntry;
