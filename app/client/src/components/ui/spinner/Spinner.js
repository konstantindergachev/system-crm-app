import React from 'react';

import './Spinner.scss';

const Spinner = () => {
  return (
    <div className="row ">
      <div className="col s12 center">
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Spinner;
