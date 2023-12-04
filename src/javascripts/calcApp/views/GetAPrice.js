import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import Header from "../components/Header";
import LayoutContainer from "../components/LayoutContainer";
import UploadBill from "../views/UploadBill";
import PostcodeEntry from "../views/PostcodeEntry";

// PropTypes
import { appStatePropType } from "../propTypes";

class GetAPrice extends Component {
  handlePostcode = postcode => {
    const { handlePostcode } = this.props;
    handlePostcode(postcode);
  };

  handleUploadResults = (fileData, uploadErrorMessage) => {
    const { handleUploadResults } = this.props;
    handleUploadResults(fileData, uploadErrorMessage);
  };

  render() {
    return (
      <LayoutContainer>
        <div className="o-layout__item  u-10/12@tablet">
          <Header title="Get a price" />
          <article className="c-split-callout">
            <header className="u-bg-pink-to-purple">
              <PostcodeEntry
                appState={this.props.appState}
                handlePostcode={this.handlePostcode}
              />
              <p className="c-rounded-title">
                <span>or</span>
              </p>
            </header>
            <footer>
              <UploadBill handleUploadResults={this.handleUploadResults} />
            </footer>
          </article>
        </div>
      </LayoutContainer>
    );
  }
}

GetAPrice.propTypes = {
  appState: PropTypes.shape(appStatePropType).isRequired,
  handlePostcode: PropTypes.func.isRequired,
  handleUploadResults: PropTypes.func.isRequired,
};

export default GetAPrice;
