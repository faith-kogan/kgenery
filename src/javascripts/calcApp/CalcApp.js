import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

// View
import CalcApp from "./views/CalcApp";

export default class CalcAppWrapper {
  constructor(el) {
    this.el = el;
    this.init();
  }

  init = () => {
    const render = (Component, mountNode) => {
      ReactDOM.render(
        <HashRouter>
          <Component />
        </HashRouter>,
        mountNode
      );
    };

    if (module.hot) {
      module.hot.accept("./views/RatesApp", () => {
        render(CalcApp, this.el);
      });
    }

    render(CalcApp, this.el);
  };
}
