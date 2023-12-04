import React, { Component } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
/* eslint-disable no-unused-vars */
import tooltipster from "tooltipster";
/* eslint-enable */

class TooltipComponent extends Component {
  componentDidMount() {
    $(this.tooltip).tooltipster({
      arrow: true,
      theme: ["tooltipster-light", "tooltipster-light-customized"],
      delay: 100,
      distance: 30,
      trigger: 'custom',

      triggerOpen: {
          touchstart: true
      },
      triggerClose: {
          tap: true
      },
      functionInit: (instance, helper) => {
        const contentSelector = helper.origin.getAttribute("aria-describedby");
        const contentHtml = $(`#${contentSelector}`).html();
        instance.content(contentHtml);
      },
      functionReady: (instance, helper) => {
        const contentSelector = helper.origin.getAttribute("aria-describedby");
        const contentEl = $(`#${contentSelector}`);
        contentEl.attr("aria-hidden", true);
      },

      functionAfter: (instance, helper) => {
        const contentSelector = helper.origin.getAttribute("aria-describedby");
        const contentEl = $(`#${contentSelector}`);
        contentEl.attr("aria-hidden", true);
      },
    });
  }


  handleBlur = () => {
    $(this.tooltip).tooltipster("close");
  };

  handleFocus = () => {
    $(this.tooltip).tooltipster("open");
  };

  handleClick = () => {
    $(this.tooltip).tooltipster("open");
  };

  render() {
    const { name, content } = this.props;
    return (
      <span>
        <span
          className="c-tooltip"
          aria-describedby={name}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
          tabIndex="0"
          ref={c => {
            this.tooltip = c;
          }}
        >
          <span className="c-tooltip__icon">i</span>
        </span>
        <span id={name} role="tooltip" className="u-hidden-visually">
          {content}
        </span>
      </span>
    );
  }
}

TooltipComponent.propTypes = {
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TooltipComponent;
