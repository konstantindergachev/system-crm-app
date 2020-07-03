// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { isArray } from 'util';
import TableItem from './table-item/TableItem';

const Table = (props) => {
  const {
    positions,
    orderQuantity,
    handleChange,
    positionId,
    isModal,
    handleAddPositionToOrder,
    handleRemovePositionFromOrder,
  } = props;
  return (
    <table className="highlight">
      <thead>
        {isModal ? (
          <tr>
            <th>Название</th>
            <th>Количество</th>
            <th>Цена</th>
          </tr>
        ) : (
          <tr>
            <th>Название</th>
            <th>Стоимость</th>
            <th>Количество</th>
          </tr>
        )}
      </thead>
      <tbody>
        {isArray(positions) ? (
          positions.map((position) => (
            <TableItem
              key={position._id}
              id={position._id}
              name={position.name}
              quantity={
                position.quantity ? (
                  position.quantity
                ) : position._id === positionId ? (
                  orderQuantity
                ) : (
                  1
                )
              }
              cost={position.cost}
              handleChange={position._id ? handleChange : null}
              isModal={isModal}
              handleAddPositionToOrder={handleAddPositionToOrder}
              handleRemovePositionFromOrder={handleRemovePositionFromOrder}
            />
          ))
        ) : positions instanceof Object ? (
          positions.list.map((position) => (
            <TableItem
              key={position._id}
              id={position._id}
              name={position.name}
              quantity={
                position.quantity ? (
                  position.quantity
                ) : position._id === positionId ? (
                  orderQuantity
                ) : (
                  1
                )
              }
              cost={position.cost}
              handleChange={position._id ? handleChange : null}
              isModal={isModal}
              handleAddPositionToOrder={handleAddPositionToOrder}
              handleRemovePositionFromOrder={handleRemovePositionFromOrder}
            />
          ))
        ) : null}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  positions: PropTypes.array,
  orderQuantity: PropTypes.number,
  handleChange: PropTypes.func,
  positionId: PropTypes.string,
  isModal: PropTypes.bool.isRequired,
  handleAddPositionToOrder: PropTypes.func,
  handleRemovePositionFromOrder: PropTypes.func,
};

export default withRouter(Table);
