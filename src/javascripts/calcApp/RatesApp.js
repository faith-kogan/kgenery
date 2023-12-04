import React from "react";
import ReactDOM from "react-dom";

// View
import RatesApp from "./views/RatesApp";

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

    render(RatesApp, this.el);

    if (module.hot) {
      module.hot.accept("./views/RatesApp", () => {
        render(RatesApp, this.el);
      });
    }
  };
}
