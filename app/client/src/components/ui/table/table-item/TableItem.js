import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import TextFieldGroup from '../../text-field-group/TextFieldGroup';
import './TableItem.scss';

const TableItem = (props) => {
  const {
    id,
    name,
    quantity,
    cost,
    handleChange,
    isModal,
    handleAddPositionToOrder,
    handleRemovePositionFromOrder,
  } = props;
  return (
    <tr>
      {isModal ? (
        <Fragment>
          <td>{name}</td>
          <td>{quantity}</td>
          <td>{cost} грн.</td>
          <td onClick={() => handleRemovePositionFromOrder(id)}>
            <i className="material-icons pointer">delete</i>
          </td>
        </Fragment>
      ) : (
        <Fragment>
          <td>{name}</td>
          <td>{cost} грн.</td>
          <td>
            <div className="input-field inline order-position-input">
              <TextFieldGroup
                id={id}
                type="number"
                name="number"
                value={quantity < 0 ? 0 : quantity}
                onChange={handleChange}
                // error={errors}
              />
            </div>
          </td>
          <td>
            <button
              className="btn waves-effect wavers-light btn-small"
              disabled={quantity < 1 && true}
              onClick={() => handleAddPositionToOrder(id, name, cost, quantity)}
            >
              Додати
            </button>
          </td>
        </Fragment>
      )}
    </tr>
  );
};

TableItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  handleChange: PropTypes.func,
  isModal: PropTypes.bool.isRequired,
  handleAddPositionToOrder: PropTypes.func,
  handleRemovePositionFromOrder: PropTypes.func,
};

export default TableItem;
