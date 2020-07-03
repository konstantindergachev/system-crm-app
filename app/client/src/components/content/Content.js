import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import AnalyticsContent from '../analytics/analytics-content/AnalyticsContent';
import AddCategoryContent from '../categories/add-category-content/AddCategoryContent';
import CategoriesContent from '../categories/categories-content/CategoriesContent';
import HistoryContent from '../history/history-content/HistoryContent';
import OrderCategory from '../order/order-category/OrderCategory';
import OrderPosition from '../order/order-position/OrderPosition';
import OverviewContent from '../overview/overview-content/OverviewContent';
import './Content.scss';

const Content = (props) => {
  switch (props.match.path) {
    case '/overview':
      return (
        <main className="content">
          <OverviewContent
            yesterday={props.yesterday}
            gain={props.gain}
            orders={props.orders}
            isTapTarget={props.isTapTarget}
            handleInfo={props.handleInfo}
          />
        </main>
      );
    case '/analytics':
      return (
        <main className="content">
          <AnalyticsContent
            isLoading={props.isLoading}
            average={props.average}
            gainConfig={props.gainConfig}
            orderConfig={props.orderConfig}
          />
        </main>
      );
    case '/history':
      return (
        <main className="content">
          <HistoryContent
            noOrders={props.noOrders}
            orders={props.orders}
            handleSubmit={props.handleSubmit}
            handleHistoryModalOpen={props.handleHistoryModalOpen}
            isFilteredOrders={props.isFilteredOrders}
            isFilterOpen={props.isFilterOpen}
            openFilter={props.openFilter}
          />
        </main>
      );
    case '/order':
      return (
        <main className="content">
          <OrderCategory
            isLoading={props.isLoading}
            categories={props.categories}
            token={props.token}
            isModal={props.isModal}
            handleOpenOrderModal={props.handleOpenOrderModal}
            handleCloseOrderModal={props.handleCloseOrderModal}
          />
        </main>
      );
    case '/order/:id':
      return (
        <main className="content">
          <OrderPosition location={props.location} history={props.history} />
        </main>
      );
    case '/categories':
      return (
        <main className="content">
          <CategoriesContent
            isLoading={props.isLoading}
            categories={props.categories}
          />
        </main>
      );
    case '/categories/category/:id':
      return (
        <main className="content">
          <AddCategoryContent />
        </main>
      );
    case '/categories/new':
      return (
        <main className="content">
          <AddCategoryContent path={props.match.path} />
        </main>
      );

    default:
      return null;
  }
};

Content.propTypes = {
  yesterday: PropTypes.string,
  gain: PropTypes.object,
  orders: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
  isTapTarget: PropTypes.bool,
  handleInfo: PropTypes.func,

  isLoading: PropTypes.bool,
  average: PropTypes.number,
  gainConfig: PropTypes.object,
  orderConfig: PropTypes.object,

  noOrders: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired,
  ]),
  handleSubmit: PropTypes.func,
  handleHistoryModalOpen: PropTypes.func,
  isFilteredOrders: PropTypes.bool,
  isFilterOpen: PropTypes.bool,
  openFilter: PropTypes.func,

  categories: PropTypes.array,
  token: PropTypes.string,
  isModal: PropTypes.bool,
  handleOpenOrderModal: PropTypes.func,
  handleCloseOrderModal: PropTypes.func,

  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  path: PropTypes.string,
};

export default withRouter(Content);
