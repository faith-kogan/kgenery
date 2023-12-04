import React, { Fragment } from "react";

const RangeSliderKey = () => (
  <Fragment>
    <ul className="c-rangeslider__key">
      <li>
        <p>
          <b>Rarely home</b>
        </p>
      </li>
      <li>
        <p>
          <b>Singles & couples</b>
          1-2 people
        </p>
      </li>
      <li>
        <p>
          <b>Family</b>
          3-4 people
        </p>
      </li>
      <li>
        <p>
          <b>Sharehouse</b>
          5-6 people
        </p>
      </li>
      <li>
        <p>
          <b>Seen from space</b>
          6+ people
        </p>
      </li>
    </ul>
    <ol className="c-rangeslider__dividers">
      <li>
        <span>20%</span>
      </li>
      <li>
        <span>40%</span>
      </li>
      <li>
        <span>60%</span>
      </li>
      <li>
        <span>80%</span>
      </li>
    </ol>
  </Fragment>
);

export default RangeSliderKey;
