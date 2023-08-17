import React, { Fragment } from 'react';

import './InformButton.scss';

const InformButton = () => {
  return (
    <Fragment>
      <button id="menu" className="waves-effect waves-light btn btn-floating">
        <i className="material-icons">info</i>
      </button>
    </Fragment>
  );
};

export default InformButton;
