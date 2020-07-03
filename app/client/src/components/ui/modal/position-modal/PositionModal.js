import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createPosition,
  updatePosition,
} from '../../../../redux/actions/positionActions';
import TextFieldGroup from '../../text-field-group/TextFieldGroup';
import './PositionModal.scss';

const modalStyle = {
  zIndex: '1003',
  display: 'block',
  width: '50%',
  opacity: '1',
  top: '10%',
  transform: 'scaleX(1) scaleY(1)',
};
class PositionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionName: '',
      cost: '',
      isShowed: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.isShowed && prevState.positionName !== '') {
      return {
        positionName: prevState.positionName,
        cost: prevState.cost,
      };
    } else if (!prevState.isShowed && nextProps.posName) {
      return {
        positionName: nextProps.posName,
        cost: nextProps.posCost.toString(),
        isShowed: true,
      };
    }
    return null;
  }
  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };
  handleSubmit = (ev) => {
    ev.preventDefault();
    const {
      createPosition,
      history,
      token,
      categoryId,
      updatePosition,
      posId,
    } = this.props;
    const positionData = {
      name: this.state.positionName,
      cost: this.state.cost,
      category: categoryId,
    };
    if (posId) {
      updatePosition(positionData, posId, token);
    } else {
      createPosition(positionData, history, token);
      this.setState({
        positionName: '',
        cost: '',
      });
    }
  };
  render() {
    const { positionName, cost } = this.state;
    const { isModal, handleClosePositionModal, posId } = this.props;

    return (
      <div className={`modal__overlay ${isModal && 'modal__overlay-open'}`}>
        <form
          className="modal"
          style={isModal ? modalStyle : null}
          onSubmit={this.handleSubmit}
        >
          <div className="modal-content">
            <h4 className="mb1">
              {posId ? 'Изменить позицию' : 'Добавить позицию'}
            </h4>
            <div className="input-field">
              <TextFieldGroup
                placeholder="Название"
                name="positionName"
                value={positionName}
                onChange={this.handleChange}
                // error={errors ? error.name : ''}
              />
            </div>
            <div className="input-field">
              <TextFieldGroup
                placeholder="Цена"
                name="cost"
                value={cost}
                onChange={this.handleChange}
                // error={errors ? error.cost : ''}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="modal-action waves-effect waves-black btn-flat"
              onClick={handleClosePositionModal}
            >
              Отмена
            </button>
            <button
              className="modal-action btn waves-effect"
              onClick={handleClosePositionModal}
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    );
  }
}
PositionModal.propTypes = {
  posId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  categoryId: PropTypes.string.isRequired,
  isModal: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  handleClosePositionModal: PropTypes.func.isRequired,
  createPosition: PropTypes.func.isRequired,
  updatePosition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.position,
});
export default connect(mapStateToProps, { createPosition, updatePosition })(
  PositionModal
);
