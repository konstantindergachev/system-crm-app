import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Spinner from '../../ui/spinner/Spinner';
import './OverviewContent.scss';

const OverviewContent = ({ yesterday, gain, orders, isTapTarget, handleInfo }) => {
  return (
    <Fragment>
      <div className="page-title">
        <h4>
          Огляд за вчора ({yesterday}){' '}
          <i className="material-icons black-text pointer" onClick={handleInfo}>
            info_outline
          </i>
        </h4>
      </div>
      {gain ? (
        <div className="row">
          <div className="col s12 l6">
            <div className="card light-blue lighten-2 white-text">
              <div className="card-content">
                <span className="card-title">Виторг:</span>
                <h3>{gain.yesterday} грн.</h3>
                <h3 className={`${gain.isHigher ? 'green-text text-darken-2' : 'red-text'} m0 mb1`}>
                  <i className="material-icons">
                    {gain.isHigher ? 'arrow_upward' : 'arrow_downward'}
                  </i>
                  {gain.percent}%
                </h3>
                <p>
                  Виторг вашого бізнесу вчора на {gain.percent}% {gain.isHigher ? 'вище' : 'нижче'}{' '}
                  середнього: {gain.compare} грн. в день
                </p>
              </div>
            </div>
          </div>

          <div className="col s12 l6">
            <div className="card orange lighten-2 white-text">
              <div className="card-content">
                <span className="card-title">Замовлення:</span>
                <h3>{orders.yesterday} зам.</h3>
                <h3
                  className={`${orders.isHigher ? 'green-text text-darken-2' : 'red-text'} m0 mb1`}
                >
                  <i className="material-icons">
                    {orders.isHigher ? 'arrow_upward' : 'arrow_downward'}
                  </i>
                  {orders.percent}%
                </h3>
                <p>
                  Число замовлень вчора на {orders.percent}% {orders.isHigher ? 'вище' : 'нижче'}{' '}
                  середнього значення: {orders.compare} зам. в день
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}

      {isTapTarget && (
        <div className="overview__content-wrap">
          <h5 className="overview__content-title">Навіщо потрібна ця сторінка?</h5>
          <p className="overview__content-text">
            Сторінка "Огляд" покаже динаміку продажів за попередній день. Порівняння із середніми
            значеннями допоможе вам зрозуміти, як йдуть справи у Вашого бізнесу.
          </p>
        </div>
      )}
    </Fragment>
  );
};

OverviewContent.propTypes = {
  yesterday: PropTypes.string,
  gain: PropTypes.object,
  orders: PropTypes.object,
  isTapTarget: PropTypes.bool.isRequired,
  handleInfo: PropTypes.func.isRequired,
};

export default OverviewContent;
