import React from "react";
import PropTypes from "prop-types";
import BasicPlanResultsListItem from "./BasicPlanResultsListItem";

const BasicPlanResultsList = ({ group }) => (
  <article className="c-document-list">
    <h2 className="u-hidden-visually">{group[0].type}</h2>
    <ul>
      {group.map(item => <BasicPlanResultsListItem item={item} key={item.title} />)}
    </ul>
  </article>
);

BasicPlanResultsList.propTypes = {
  group: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default BasicPlanResultsList;


