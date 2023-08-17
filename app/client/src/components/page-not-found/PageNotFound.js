import React from 'react';
import { withRouter } from 'react-router-dom';

import './PageNotFound.scss';

const PageNotFound = () => (
  <div className="page__not-found">
    <h1 className="error__text">404</h1>
    <h2 className="error__text">Сторінку не знайдено</h2>
    <p>Вибачте, такої сторінки не існує</p>
  </div>
);
export default withRouter(PageNotFound);
