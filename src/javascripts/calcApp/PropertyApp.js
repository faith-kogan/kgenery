import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

// View
import PropertyApp from "./views/PropertyApp";

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
      module.hot.accept("./views/PropertyApp", () => {
        render(PropertyApp, this.el);
      });
    }

    render(PropertyApp, this.el);
  };
}
