import React, { Fragment } from 'react';
import { INFORM_BTN } from '../../constants';

import './InformButton.scss';

const InformButton = () => {
  return (
    <Fragment>
      <button id="menu" className="waves-effect waves-light btn btn-floating">
        <i className="material-icons">{INFORM_BTN}</i>
      </button>
    </Fragment>
  );
};

export default InformButton;
