import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const Button = ({
  icon,
  children,
  link,
  onClick,
  className,
  disabled,
  element,
  type,
  ...props
}) => {
  const ElementType = element;

  return (
    <ElementType
      type={type}
      href={link}
      onClick={onClick}
      className={cx("c-btn", {
        "c-btn--chunky": props.chunky,
        "c-btn--outlined": props.outlined,
        "c-btn--loading": props.loading,
        "c-btn--pink": props.pink,
        "c-btn--red": props.red,
        "c-btn--white": props.white,
        "c-btn--full": props.full,
        "c-btn--centered": props.centered,
        "c-btn--full@mobile": props.fullAtMobile,
        "c-btn--icon-right": props.iconRight,
        "u-margin-bottom-base": props.marginBase,
        "lets-get-started": props.letsGetStarted,
        "c-switch-app--join-now": props.joinNow,
        "join-now-above": props.joinNowAbove,
        "join-now-below": props.joinNowBelow,
      })}
      disabled={disabled}
    >
      {children}
      {icon}
      {disabled}
    </ElementType>
  );
};

Button.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  element: PropTypes.string,
  chunky: PropTypes.bool,
  outlined: PropTypes.bool,
  white: PropTypes.bool,
  loading: PropTypes.bool,
  centered: PropTypes.bool,
  pink: PropTypes.bool,
  full: PropTypes.bool,
  fullAtMobile: PropTypes.bool,
  iconRight: PropTypes.bool,
};

Button.defaultProps = {
  icon: null,
  text: "",
  link: null,
  disabled: false,
  onClick: null,
  className: null,
  element: "button",
  type: null,
  chunky: false,
  outlined: false,
  centered: false,
  white: false,
  loading: false,
  pink: false,
  full: false,
  fullAtMobile: false,
  iconRight: false,
};

export default Button;
