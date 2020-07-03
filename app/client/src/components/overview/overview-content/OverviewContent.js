import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Spinner from '../../ui/spinner/Spinner';
import './OverviewContent.scss';

const OverviewContent = ({
  yesterday,
  gain,
  orders,
  isTapTarget,
  handleInfo,
}) => {
  return (
    <Fragment>
      <div className="page-title">
        <h4>
          Обзор за вчера ({yesterday}){' '}
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
                <span className="card-title">Выручка:</span>
                <h3>{gain.yesterday} грн.</h3>
                <h3
                  className={`${gain.isHigher
                    ? 'green-text text-darken-2'
                    : 'red-text'} m0 mb1`}
                >
                  <i className="material-icons">
                    {gain.isHigher ? 'arrow_upward' : 'arrow_downward'}
                  </i>
                  {gain.percent}%
                </h3>
                <p>
                  Выручка вашего бизнеса вчера на {gain.percent}%{' '}
                  {gain.isHigher ? 'выше' : 'ниже'} среднего: {gain.compare}{' '}
                  грн. в день
                </p>
              </div>
            </div>
          </div>

          <div className="col s12 l6">
            <div className="card orange lighten-2 white-text">
              <div className="card-content">
                <span className="card-title">Заказы:</span>
                <h3>{orders.yesterday} зак.</h3>
                <h3
                  className={`${orders.isHigher
                    ? 'green-text text-darken-2'
                    : 'red-text'} m0 mb1`}
                >
                  <i className="material-icons">
                    {orders.isHigher ? 'arrow_upward' : 'arrow_downward'}
                  </i>
                  {orders.percent}%
                </h3>
                <p>
                  Число заказов вчера на {orders.percent}%{' '}
                  {orders.isHigher ? 'выше' : 'ниже'} среднего значения:{' '}
                  {orders.compare} зак. в день
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
          <h5 className="overview__content-title">Зачем нужна эта страница?</h5>
          <p className="overview__content-text">
            Страница “Обзор” покажет динамику продаж за предыдущий день.
            Сравнение со средним значениями поможет вам понять, как идут дела у
            Вашего бизнеса.
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
