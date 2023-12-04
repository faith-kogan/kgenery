import React from "react";
import PropTypes from "prop-types";

const LayoutContainer = ({ children }) => (
  <section className="o-layout  o-layout--center">{children}</section>
);

LayoutContainer.propTypes = {
  children: PropTypes.node,
};

LayoutContainer.defaultProps = {
  children: null,
};

export default LayoutContainer;
