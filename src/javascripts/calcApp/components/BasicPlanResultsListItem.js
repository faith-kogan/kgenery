import React from "react";
import PropTypes from "prop-types";

// Components
import * as Icons from "./Icons";

const BasicPlanResultsListItem = ({ item }) => (
  <li className="c-document-item">
    <div className="c-document-item__main">
      <div>
        {item.bpidType && <span className={'c-bpid-type ' + 'c-bpid-type-' + item.bpidType}>{item.bpidType}</span>}

        <h3>{item.offerName && item.offerName} {item.distributor && <span> - {item.distributor}</span>}</h3>
        <p>
          {item.note}
          <br />
          {item.title && <small>Plan ID: {item.title}</small>}
        </p>
        {/* VIC link for VEFS */}
        {item.htmlLink && <p className="u-margin-bottom-zero"><a href="/vefs" target="_blank">Victorian Energy Fact Sheets</a></p>}


      </div>
    </div>
    <div className="c-document-item__button">
      {item.pdf && <a
        className="c-btn--red c-btn c-btn--outlined--red  c-btn--centered  c-btn--full@mobile"
        href={item.pdf}
        target="_blank"
      >
        {item.linkText ? item.linkText : "View plan"}
      </a>}
    </div>
  </li>
);

BasicPlanResultsListItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
};

export default BasicPlanResultsListItem;



