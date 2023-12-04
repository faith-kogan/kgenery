import React from "react";
import ReactDOM from "react-dom";

// View
import BasicPlanApp from "./views/BasicPlanApp";

export default class CalcAppWrapper {
  constructor(el) {
    this.el = el;
    this.customer = el.getAttribute("data-rates-customer");
    this.init();
  }

  init = () => {
    const render = (Component, mountNode) => {
      ReactDOM.render(<Component ratesCustomer={this.customer} />, mountNode);
    };

    render(BasicPlanApp, this.el);

    if (module.hot) {
      module.hot.accept("./views/BasicPlanApp", () => {
        render(BasicPlanApp, this.el);
      });
    }
  };
}
