import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import cx from "classnames";

// Components
import * as Icons from "../components/Icons";
import Button from "../components/Button";

// Utils
import * as Utils from "../utils";

class UploadBill extends Component {
  state = {
    isLoading: false,
    data: {
      days: null,
      file_id: null,
      status: null,
      valid: null,
    },
  };

  // The user has the option to download the results as a file,
  // this grabs a file from another service
  getDownloadLink = fileId => `${this.fileDownloadUrl}${fileId}`;

  responseDetailsAreValid = data => {
    const { valid } = data;
    if (valid == null) {
      return false;
    }
    return valid;
  };

  handleUpload = async event => {
    event.preventDefault();

    this.setState({
      isLoading: true,
    });

    const fileToUpload = this.uploadField.current.files[0];

    const formData = new FormData(); // eslint-disable-line
    formData.append("file_up", fileToUpload);

    // These are required by the API, we add dummy data
    formData.append("first_name", "Captain Montgomery");
    formData.append("last_name", "Powershop");
    formData.append("email", "hello@powershop.com.au");

    const responseData = await this.sendFileToAPI(
      fileToUpload,
      this.apiUrl,
      formData
    );

    if (responseData) return this.handleUploadResponse(responseData);
  };

  sendFileToAPI = (fileToUpload, apiUrl, formData) => {
    const { handleUploadResults } = this.props;
    return axios
      .post(apiUrl, formData)
      .then(response => response.data)
      .catch((response, error) => {
        if (!response.status) {
          // This is the only error we have seen we need to handle this way
          // other errors are handled when there is a response in Utils.getFileUploadErrorMessage()
          return handleUploadResults(
            this.state.data,
            "The file exceeds the maximum file size we can process"
          );
        }

        return handleUploadResults(this.state.data, error);
      });
  };

  handleUploadResponse = async data => {
    const { handleUploadResults } = this.props;

    this.setState({
      isLoading: false,
    });

    if (this.responseDetailsAreValid(data)) {
      const downloadLink = await this.getDownloadLink(data.file_id);

      const dataWithDownloadLink = { ...data, downloadLink };

      this.setState({
        data: dataWithDownloadLink,
      });

      // Send the data to the main app
      handleUploadResults(dataWithDownloadLink);
    } else {
      // Looks like there is an error, process the message...
      const uploadErrorMessage = Utils.getFileUploadErrorMessage(data);

      // ...and send to the main app for display
      handleUploadResults(data, uploadErrorMessage);
    }
  };

  uploadField = React.createRef(); // So we can get files direct from the field
  apiUrl = "https://ocr.meridianenergycloud.com.au/form/";
  fileDownloadUrl = "https://kogbill-demo.knowledge-global.com/jdoc3/mypscpdoc?dv=";

  render() {
    const { isLoading } = this.state;
    return (
      <form>
        <div className="c-input  c-input--centered">
          <label htmlFor="file_up">
            <span
              className="c-input-label  c-input-label--with-icon  c-input-label--pink-icon"
              htmlFor="file_up"
            >
              <Icons.Upload />
              Start my comparison
            </span>

            <input
              type="file"
              id="file_up"
              autoComplete="off"
              name="file_up"
              accept="application/pdf"
              onChange={this.handleUpload}
              ref={this.uploadField}
              className="u-hidden-visually"
            />

            <Button element="span" chunky outlined loading={isLoading}>
              {isLoading ? <Icons.Loading /> : "Upload my bill"}
            </Button>
          </label>
        </div>
      </form>
    );
  }
}

UploadBill.propTypes = {
  handleUploadResults: PropTypes.func.isRequired,
};

export default UploadBill;
