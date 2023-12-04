import React from "react";
import PropTypes from "prop-types";
import DistributorResultsListItem from "./DistributorResultsListItem";

const DistributorResultsList = ({ group }) => (
  <article className="c-document-list">
    <h2>{group[0].type}</h2>
    <ul>
      {group.map(item => <DistributorResultsListItem item={item} key={item.title} />)}
    </ul>
  </article>
);

DistributorResultsList.propTypes = {
  group: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default DistributorResultsList;
