import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

// View
import SwitchApp from "./views/SwitchApp";

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
      module.hot.accept("./views/SwitchApp", () => {
        const NewSwitchApp = require('./views/SwitchApp').default

        ReactDOM.render(
          <HashRouter>
            <NewSwitchApp />
          </HashRouter>,
        this.el);
      });
    }

    render(SwitchApp, this.el);
  };
}
