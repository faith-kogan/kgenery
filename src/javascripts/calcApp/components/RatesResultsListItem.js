import React from "react";
import PropTypes from "prop-types";

// Components
import * as Icons from "./Icons";

const RatesResultsListItem = ({ item }) => (
  <li className="c-document-item">
    <div className="c-document-item__main">
      <div className="c-document-item__icon">
        <Icons.File />
      </div>
      <div>
        <h3>{item.title}</h3>
        {item.note && <p>{item.note}</p>}
      </div>
    </div>
    <div className="c-document-item__button">
      <a
        className="c-btn--red c-btn c-btn--outlined--red  c-btn--centered  c-btn--full@mobile"
        href={item.pdf}
        target="_blank"
      >
        {item.linkText ? item.linkText : "Download"}
      </a>
    </div>
  </li>
);

RatesResultsListItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
};

export default RatesResultsListItem;
