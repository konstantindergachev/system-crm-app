import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import PositionModal from '../ui/modal/position-modal/PositionModal';
// import InfoModal from '../ui/modal/info-modal/InfoModal';
import Spinner from '../ui/spinner/Spinner';
import './Positions.scss';

class Positions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      positionId: '',
      positionName: '',
      positionCost: '',
    };
  }

  // componentDidMount() {
  //   this.isShowedTimer = setTimeout(() => {
  //     this.setState((oldState) => ({ isModal: !oldState.isModal }));
  //     this.isShowedTimer = 0;
  //   }, 2500);
  // }

  // componentWillUnmount() {
  //   if (this.isShowedTimer) {
  //     clearTimeout(this.isShowedTimer);
  //     this.isShowedTimer = 0;
  //   }
  // }

  static getDerivedStateFromProps(props, prevState) {
    if (prevState.positionId) {
      return {
        positionId: prevState.positionId,
      };
    }
    return null;
  }

  handleAddPositionModal = () => {
    this.setState((oldState) => ({
      isModal: !oldState.isModal,
      positionId: '',
    }));
  };
  handleUpdatePositionModal = (positionId, positionName, positionCost) => {
    this.setState((oldState) => ({ isModal: !oldState.isModal }));
    this.setState({ positionId, positionName, positionCost });
  };
  handleClosePositionModal = () => {
    this.setState((oldState) => ({ isModal: !oldState.isModal }));
  };
  handleDeletePosition = (positionId) => {
    const { deletePosition, token } = this.props;
    deletePosition(positionId, token);
  };
  render() {
    const { isModal, positionId, positionName, positionCost } = this.state;
    const {
      token,
      categoryId,
      isLoading,
      positions,
      history,
      // msg,
    } = this.props;
    return (
      <Fragment>
        <div className="col s12">
          {/* {!isModal && msg !== '' && <InfoModal info={msg} />} */}
          <div className="page-subtitle">
            <h4>Позиции:</h4>
            <button
              type="button"
              className="waves-effect waves-light btn grey darken-1 btn-small modal-trigger"
              data-target="create-modal"
              onClick={this.handleAddPositionModal}
            >
              Добавить позицию
            </button>
          </div>
          {isLoading ? (
            <Spinner />
          ) : positions.length > 0 ? (
            positions.map(
              (position) =>
                position.category === categoryId && (
                  <div
                    key={position._id}
                    className="col s12 collection position__wrapper"
                  >
                    <div
                      onClick={() =>
                        this.handleUpdatePositionModal(
                          position._id,
                          position.name,
                          position.cost
                        )}
                    >
                      <div className="collection-item">
                        <span>
                          {position.name} <strong>{position.cost} грн.</strong>
                        </span>
                      </div>
                    </div>
                    <span
                      onClick={() => this.handleDeletePosition(position._id)}
                      className="collection-item collection-item-icon"
                    >
                      <i className="material-icons">delete</i>
                    </span>
                  </div>
                )
            )
          ) : (
            <span className="collection__none">В категории нет позиций</span>
          )}
        </div>
        <PositionModal
          isModal={isModal}
          handleClosePositionModal={this.handleClosePositionModal}
          token={token}
          categoryId={categoryId}
          posId={positionId}
          posName={positionName}
          posCost={positionCost}
          history={history}
        />
      </Fragment>
    );
  }
}

Positions.propTypes = {
  token: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  positions: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

export default Positions;
