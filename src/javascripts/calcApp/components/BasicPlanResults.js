import React from "react";
import PropTypes from "prop-types";
import { groupBy, map } from "lodash";

import BasicPlanResultsList from "./BasicPlanResultsList";

const BasicPlanResults = ({ rates }) => {
  const groupedByCategory = groupBy(rates, "type");

  return map(groupedByCategory, group => (
    <BasicPlanResultsList group={group} key={group[0].type} />
  ));
};

BasicPlanResults.propTypes = {
  rates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default BasicPlanResults;

