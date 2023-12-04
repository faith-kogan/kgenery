import React from "react";
import PropTypes from "prop-types";

// Components
import * as Icons from "./Icons";

const UserMessage = ({ icon, title, text }) => (
  <div className="c-user-message">
    <div className="c-user-message__icon">{icon}</div>

    <div className="c-user-message__content">
      <h3 className="c-user-message__title">{title}</h3>
      <p>Computer says: {text}</p>
    </div>
  </div>
);

UserMessage.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  text: PropTypes.string,
};

UserMessage.defaultProps = {
  icon: <Icons.Warning />,
  title: "",
  text: "",
};

export default UserMessage;
