import React from "react";
import PropTypes from "prop-types";

const Header = ({ title, children, lessBottomSpacing }) => (
  <header
    className={`c-section-heading ${lessBottomSpacing &&
      "c-section-heading--less-bottom-spacing c-section-heading--no-top-spacing"} `}
  >
    <h1 className="c-section-heading__title  u-font-h2  u-pink">{title}</h1>
    {children}
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  lessBottomSpacing: PropTypes.bool,
};

Header.defaultProps = {
  children: null,
  lessBottomSpacing: false,
};

export default Header;
