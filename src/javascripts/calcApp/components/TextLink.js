import React from "react";
import PropTypes from "prop-types";

const TextLink = ({ icon, text, link, onClick, className, type }) => {
  const ElementType = type;
  return (
    <p className={`u-font-p3-medium  u-text-center  ${className}`}>
      <ElementType
        href={link}
        onClick={onClick}
        target="_blank"
        className="c-text-link"
      >
        {icon}
        <span>{text}</span>
      </ElementType>
    </p>
  );
};

TextLink.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
};

TextLink.defaultProps = {
  icon: null,
  text: "",
  link: null,
  onClick: null,
  className: null,
  type: "a",
};

export default TextLink;
