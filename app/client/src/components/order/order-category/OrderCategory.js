import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import OrderModal from '../../ui/modal/order-modal/OrderModal';
import Spinner from '../../ui/spinner/Spinner';
import OrderHeader from '../order-header/OrderHeader';
import './OrderCategory.scss';

const OrderCategory = (props) => {
  const {
    isLoading,
    categories,
    token,
    isModal,
    handleOpenOrderModal,
    handleCloseOrderModal,
    list,
    btnOff,
  } = props;
  return (
    <Fragment>
      <div className="page-title">
        <OrderHeader
          handleOpenOrderModal={handleOpenOrderModal}
          btnOff={btnOff}
        />
      </div>
      <div className="frow order-row">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={{
              pathname: `/order/${category._id}`,
              state: {
                token: token,
                categoryId: category._id,
              },
            }}
            className="card waves-effect pointer"
          >
            <div className="center">
              {isLoading ? (
                <Spinner />
              ) : (
                <img
                  src={category.imageSrc}
                  className="responsive-img order-img"
                  alt="Cake"
                />
              )}
            </div>
            <div className="card-content center p10">
              <h5 className="m0">{category.name}</h5>
            </div>
          </Link>
        ))}
      </div>
      <OrderModal
        list={list}
        isModal={isModal}
        handleCloseOrderModal={handleCloseOrderModal}
      />
    </Fragment>
  );
};

OrderCategory.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  isModal: PropTypes.bool.isRequired,
  handleOpenOrderModal: PropTypes.func.isRequired,
  handleCloseOrderModal: PropTypes.func.isRequired,
  list: PropTypes.array,
  btnOff: PropTypes.bool,
};

export default OrderCategory;
