import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllCategories } from '../../redux/actions/categoryActions';
import Content from '../content/Content';
import FloatingButton from '../floating-button/FloatingButton';
import Sidebar from '../sidebar/Sidebar';

import './Categories.scss';

class Categories extends Component {
  componentDidMount() {
    const { getAllCategories } = this.props;
    const token = localStorage.getItem('jwtToken');
    getAllCategories(token);
  }
  render() {
    const { isAuth, username, logOutClick, isLoading, categories } = this.props;

    return (
      <Fragment>
        <Sidebar isAuth={isAuth} username={username} logOutClick={logOutClick} />
        <Content isLoading={isLoading} categories={categories} />
        <FloatingButton />
      </Fragment>
    );
  }
}

Categories.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  getAllCategories: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  logOutClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.category.isLoading,
  categories: state.category.categories,
});
export default connect(mapStateToProps, { getAllCategories })(Categories);
