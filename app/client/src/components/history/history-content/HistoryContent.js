import M from 'materialize-css';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { dateFormat, timeFormat } from '../../../helpers/dateFormat';
import { getTotalSum } from '../../../helpers/getTotalSum';
import Spinner from '../../ui/spinner/Spinner';
import HistoryFilter from '../history-filter/HistoryFilter';
import HistoryItem from '../history-item/HistoryItem';
import './HistoryContent.scss';

class HistoryContent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      number: '1',
      tooltip: {},
    };
    this.refTooltip = React.createRef();
  }

  componentDidMount() {
    this.setState({
      tooltip: M.Tooltip.init(this.refTooltip.current),
    });
  }
  componentWillUnmount() {
    this.setState((oldState) => ({
      tooltip: oldState.tooltip.destroy(),
    }));
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };

  render() {
    const {
      noOrders,
      orders,
      isComplete,
      isLoading,
      handleSubmit,
      handleHistoryModalOpen,
      isLoadAfterFiltering,
      isFilteredOrders,
      isFilterOpen,
      openFilter,
    } = this.props;
    return (
      <Fragment>
        <div className="page-title">
          <h4>История заказов</h4>
          <button
            ref={this.refTooltip}
            className={`btn btn-small js-filter tooltipped ${isFilteredOrders &&
              'filter__btn-active'}`}
            data-tooltip={`${isFilterOpen
              ? 'Закрыть фильтр'
              : 'Открыть фильтр'}`}
            data-position="left"
            onClick={openFilter}
          >
            <i className="material-icons">filter_list</i>
          </button>
        </div>
        {isFilterOpen && <HistoryFilter handleSubmit={handleSubmit} />}
        {isLoadAfterFiltering ? (
          <Spinner />
        ) : noOrders ? (
          <div className="center">{noOrders}</div>
        ) : (
          <table className="highlight mb2">
            <thead>
              <tr>
                <th>№</th>
                <th>Дата</th>
                <th>Время</th>
                <th>Сумма</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <HistoryItem
                    key={order._id}
                    id={order._id}
                    orderNumber={order.order}
                    date={dateFormat(order.createdAt)}
                    time={timeFormat(order.createdAt)}
                    orderTotalSum={getTotalSum(order.list)}
                    handleHistoryModalOpen={handleHistoryModalOpen}
                  />
                ))}
            </tbody>
          </table>
        )}
        <div className="center mb2">
          {isLoading ? (
            <Spinner />
          ) : !isComplete && !isFilterOpen ? (
            <button
              className="btn waves-effect grey darken-1 btn-small"
              onClick={handleSubmit}
            >
              Загрузить еще
            </button>
          ) : (
            ''
          )}
        </div>
      </Fragment>
    );
  }
}

HistoryContent.propTypes = {
  isComplete: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadAfterFiltering: PropTypes.bool.isRequired,
  noOrders: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired,
  ]),
  orders: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleHistoryModalOpen: PropTypes.func.isRequired,
  isFilteredOrders: PropTypes.bool.isRequired,
  isFilterOpen: PropTypes.bool.isRequired,
  openFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isComplete: state.history.isComplete,
  isLoading: state.history.isLoading,
  isLoadAfterFiltering: state.order.isLoading,
});

export default connect(mapStateToProps, null)(HistoryContent);
