import React from "react";
import PropTypes from "prop-types";
import { groupBy, map } from "lodash";
import RatesResultsList from "./RatesResultsList";

const RatesResults = ({ rates }) => {
  const groupedByCategory = groupBy(rates, "type");

  return map(groupedByCategory, group => (
    <RatesResultsList group={group} key={group[0].type} />
  ));
};

RatesResults.propTypes = {
  rates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default RatesResults;
