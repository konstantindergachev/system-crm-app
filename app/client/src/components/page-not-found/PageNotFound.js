import React from 'react';
import { withRouter } from 'react-router-dom';
import { PAGE_NOT_FOUND } from '../../constants';

import './PageNotFound.scss';

const PageNotFound = () => (
  <div className="page__not-found">
    <h1 className="error__text">{PAGE_NOT_FOUND.TITLE}</h1>
    <h2 className="error__text">{PAGE_NOT_FOUND.SUB_TITLE}</h2>
    <p>{PAGE_NOT_FOUND.TEXT}</p>
  </div>
);
export default withRouter(PageNotFound);
