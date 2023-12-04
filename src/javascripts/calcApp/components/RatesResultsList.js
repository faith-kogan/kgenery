import React from "react";
import PropTypes from "prop-types";
import RatesResultsListItem from "./RatesResultsListItem";

const RatesResultsList = ({ label, group }) => (
  <article className="c-document-list">
    <h2>{label || group[0].type}</h2>
    <ul>
      {group.map(item => <RatesResultsListItem item={item} key={item.pdf} />)}
    </ul>
  </article>
);

RatesResultsList.propTypes = {
  label: PropTypes.string,
  group: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

RatesResultsList.defaultProps = {
  label: "",
};

export default RatesResultsList;
