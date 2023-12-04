import React from "react";
import PropTypes from "prop-types";

// Components
import * as Icons from "./Icons";

const DistributorResultsListItem = ({ item }) => (
  <li className="c-document-item">
    <div className="c-document-item__main">
      <div>
        <h3>{item.title}</h3>
        Faults and Emergencies:&nbsp;
        <a 
        href={'tel:' + item.phoneFault}
        target="_blank"
        >
        {item.phoneFault}
        </a>
      </div>
    </div>
    <div className="c-document-item__button">
      <a
        className="c-btn  c-btn--outlined  c-btn--centered  c-btn--full@mobile"
        href={item.externalLink}
        target="_blank"
      >
        Visit website
      </a>
    </div>
  </li>
);

DistributorResultsListItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
};

export default DistributorResultsListItem;
