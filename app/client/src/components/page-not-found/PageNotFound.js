import React from 'react';
import { withRouter } from 'react-router-dom';
import './PageNotFound.scss';

const PageNotFound = () => (
  <div className="page__not-found">
    <h1 className="error__text">404</h1>
    <h2 className="error__text">Страница не найдена</h2>
    <p>Извините, такой страницы не существует</p>
  </div>
);
export default withRouter(PageNotFound);
