import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '../../../redux/actions/categoryActions';
import {
  deletePosition,
  getPositionOfCategory,
} from '../../../redux/actions/positionActions';
import {
  removeCategoryImage,
  uploadCategoryImage,
} from '../../../redux/actions/uploadImageActions';
import Positions from '../../positions/Positions';
import TextFieldGroup from '../../ui/text-field-group/TextFieldGroup';
import './AddCategoryContent.scss';

class AddCategoryContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imgPreviewUrl: '',
      errors: {},
      selectedFile: null,
      isSended: false,
      token: '',
      info: '',
    };
  }
  componentDidMount() {
    const { getPositionOfCategory, location: { state } } = this.props;
    const token = localStorage.getItem('jwtToken');
    this.setState({ token });
    if (state) {
      getPositionOfCategory(state.category._id, token);
    }
  }

  static getDerivedStateFromProps(props, prevState) {
    const { location: { state } } = props;
    if (state && prevState.name === '') {
      return {
        name: state.category.name,
      };
    }
    if (state && prevState.name !== '') {
      return {
        name: prevState.name,
      };
    }
    if (prevState.info !== props.info) {
      return {
        info: props.info,
      };
    }

    return null;
  }

  handleChange = (ev) => {
    ev.preventDefault();
    this.setState({ [ev.target.name]: ev.target.value });
  };
  handleSelectedFile = (ev) => {
    const reader = new FileReader();
    const file = ev.target.files[0];
    const pattern = /image-*/;
    if (!file.type.match(pattern)) {
      alert('Формат картинки недоступен! Выберите другой формат.');
    }
    reader.onloadend = () => {
      this.setState({
        selectedFile: file,
        imgPreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  handleUpload = () => {
    const fileData = new FormData();
    const { uploadCategoryImage } = this.props;
    const { selectedFile, token } = this.state;
    fileData.append('file', selectedFile, selectedFile.name);
    uploadCategoryImage(fileData, token);
    this.setState({
      selectedFile: null,
      isSended: true,
    });
  };
  handleRemoveCategoryImage = () => {
    const { imageId, removeCategoryImage } = this.props;
    const { token } = this.state;
    removeCategoryImage(imageId, token);
    this.setState({
      imgPreviewUrl: '',
      selectedFile: null,
      isSended: false,
    });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {
      createCategory,
      path,
      updateCategory,
      history,
      location: { state },
    } = this.props;
    const { token } = this.state;
    const categoryData = {
      name: this.state.name,
    };
    if (path) {
      createCategory(categoryData, history, token);
    } else {
      updateCategory(categoryData, state.category._id, history, token);
    }
    this.setState({
      name: '',
      img: '',
      selectedFile: null,
      imgPreviewUrl: '',
      isSended: false,
    });
  };

  handleDeleteCategory = (categoryId) => {
    const { deleteCategory, imageId, history } = this.props;
    const { token } = this.state;
    deleteCategory(categoryId, imageId, history, token);
  };

  renderPrevCategoryImage = (category) => {
    const { name, imgPreviewUrl, info } = this.state;
    if (!category) {
      if (imgPreviewUrl) {
        if (info === 'Файл успешно сохранен!') {
          return (
            <Fragment>
              <button
                type="button"
                className="btn-floating btn-floating__delete red"
                onClick={this.handleRemoveCategoryImage}
              >
                <i className="material-icons">delete</i>
              </button>
              <img
                className="responsive-img category__img"
                src={imgPreviewUrl}
                alt={name}
              />
            </Fragment>
          );
        } else {
          return (
            <img
              className="responsive-img category__img"
              src={imgPreviewUrl}
              alt={name}
            />
          );
        }
      } else {
        return <div className="category__img-empty" />;
      }
    } else {
      return (
        <img
          className="responsive-img category__img"
          src={category.imageSrc}
          alt={name}
        />
      );
    }
  };

  render() {
    const {
      path,
      history,
      location: { state },
      isLoading,
      positions,
      deletePosition,
      categoryId,
      msg,
    } = this.props;
    const { name, selectedFile, errors, isSended, token } = this.state;
    return (
      <Fragment>
        <div className="page-title">
          <h4>
            <Link to="/categories">Категории</Link>
            <i className="material-icons">keyboard_arrow_right</i>
            {typeof path === 'string' ? (
              'Добавить категорию'
            ) : (
              'Изменить категорию'
            )}
          </h4>
          {typeof path !== 'string' && (
            <span>
              <button
                className="btn btn-small red"
                onClick={() => this.handleDeleteCategory(state.category._id)}
                // onClick={() => this.handleDeleteCategory(categoryId)}
              >
                <i className="material-icons">delete</i>
              </button>
            </span>
          )}
        </div>
        <form className="col s12 row" onSubmit={this.handleSubmit}>
          <div className="col s12 l6">
            <label className="input-field">
              <TextFieldGroup
                placeholder="Название"
                name="name"
                value={name}
                error={errors.name}
                onChange={this.handleChange}
              />
            </label>
            <label className="input-field waves-effect waves-light btn orange lighten-2">
              <TextFieldGroup
                name="img"
                type="file"
                onChange={this.handleSelectedFile}
                error={errors.img}
                disabled={name ? false : true}
              />
            </label>
            <button
              type="button"
              className="input-field waves-effect waves-light btn orange lighten-2"
              onClick={this.handleUpload}
              disabled={selectedFile ? false : true}
            >
              <i className="material-icons left">backup</i>
              Сохранить
            </button>
            <button
              type="submit"
              className="waves-effect waves-light btn"
              disabled={!isSended}
            >
              Сохранить изменения
            </button>
          </div>
          <div className="col s12 l4 center">
            {!state ? (
              this.renderPrevCategoryImage()
            ) : (
              this.renderPrevCategoryImage(state.category)
            )}
          </div>
        </form>
        {typeof path !== 'string' && (
          <Positions
            categoryId={categoryId ? categoryId : state.category._id}
            token={token}
            isLoading={isLoading}
            positions={positions}
            history={history}
            deletePosition={deletePosition}
            msg={msg}
          />
        )}
      </Fragment>
    );
  }
}

AddCategoryContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  positions: PropTypes.array.isRequired,
  categoryId: PropTypes.string,
  msg: PropTypes.string.isRequired,
  getPositionOfCategory: PropTypes.func.isRequired,
  uploadCategoryImage: PropTypes.func.isRequired,
  removeCategoryImage: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  path: PropTypes.string,
  history: PropTypes.object.isRequired,
  state: PropTypes.object,
  updateCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  deletePosition: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.position.isLoading,
  positions: state.position.positions,
  categoryId: state.position.position.category,
  msg: state.position.msg,
  imageId: state.category.imageId,
  info: state.category.info,
});

export default connect(mapStateToProps, {
  uploadCategoryImage,
  removeCategoryImage,
  createCategory,
  updateCategory,
  deleteCategory,
  getPositionOfCategory,
  deletePosition,
})(withRouter(AddCategoryContent));
