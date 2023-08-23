import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Spinner from '../../ui/spinner/Spinner';
import { OVERVIEW, MONEY, ARROW, ORDER_CONDITION } from '../../../constants';
import { moneyFormat } from '../../../helpers/moneyFormat';

import './OverviewContent.scss';

const OverviewContent = ({ yesterday, gain, orders, isTapTarget, handleInfo }) => {
  return (
    <Fragment>
      <div className="page-title">
        <h4>
          {OVERVIEW.TITLE} ({yesterday}){' '}
          <i className="material-icons black-text pointer" onClick={handleInfo}>
            {OVERVIEW.BTN_INFO}
          </i>
        </h4>
      </div>
      {gain ? (
        <div className="row">
          <div className="col s12 l6">
            <div className="card light-blue lighten-2 white-text">
              <div className="card-content">
                <span className="card-title">{OVERVIEW.REVENUE}:</span>
                <h3>{moneyFormat(MONEY.LOCALE, MONEY.CURRENCY, gain.yesterday)}</h3>
                <h3 className={`${gain.isHigher ? 'green-text text-darken-2' : 'red-text'} m0 mb1`}>
                  <i className="material-icons">{gain.isHigher ? ARROW.UPWARD : ARROW.DOWNWARD}</i>
                  {gain.percent}%
                </h3>
                <p>
                  Виторг вашого бізнесу вчора на {gain.percent}%{' '}
                  {gain.isHigher ? ORDER_CONDITION.IS_HIGHER : ORDER_CONDITION.IS_LOWER} середнього:{' '}
                  {moneyFormat(MONEY.LOCALE, MONEY.CURRENCY, gain.compare)} в день
                </p>
              </div>
            </div>
          </div>

          <div className="col s12 l6">
            <div className="card orange lighten-2 white-text">
              <div className="card-content">
                <span className="card-title">{OVERVIEW.ORDER}:</span>
                <h3>{orders.yesterday} зам.</h3>
                <h3
                  className={`${orders.isHigher ? 'green-text text-darken-2' : 'red-text'} m0 mb1`}
                >
                  <i className="material-icons">
                    {orders.isHigher ? ARROW.UPWARD : ARROW.DOWNWARD}
                  </i>
                  {orders.percent}%
                </h3>
                <p>
                  Число замовлень вчора на {orders.percent}%{' '}
                  {orders.isHigher ? ORDER_CONDITION.IS_HIGHER : ORDER_CONDITION.IS_LOWER}{' '}
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
          <h5 className="overview__content-title">{OVERVIEW.TARGET.TITLE}</h5>
          <p className="overview__content-text">{OVERVIEW.TARGET.TEXT}</p>
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
