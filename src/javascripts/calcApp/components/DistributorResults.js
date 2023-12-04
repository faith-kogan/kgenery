import React from "react";
import PropTypes from "prop-types";
import { groupBy, map } from "lodash";

import DistributorResultsList from "./DistributorResultsList";

const DistributorResults = ({ rates }) => {
  const groupedByCategory = groupBy(rates, "type");

  return map(groupedByCategory, group => (
    <DistributorResultsList group={group} key={group[0].type} />
  ));
};

DistributorResults.propTypes = {
  rates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default DistributorResults;

