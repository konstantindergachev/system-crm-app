import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../ui/spinner/Spinner';
import { CATEGORIES } from '../../../constants';

import './CategoriesContent.scss';

const CategoriesContent = ({ isLoading, categories }) => {
  return (
    <Fragment>
      <div className="page-title">
        <h4>{CATEGORIES.CONTENT.TITLE}</h4>
        <Link to="/categories/new" className="waves-effect waves-light btn grey darken-1">
          {CATEGORIES.CONTENT.SUB_TITLE_ADD_CATEGORY}
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : categories.length === 0 ? (
        <div className="center">{CATEGORIES.CONTENT.MSG}</div>
      ) : (
        categories.map((category) => (
          <div key={category._id} className="row col s12 collection categories__wrapper">
            <Link
              to={{
                pathname: `/categories/category/${category._id}`,
                state: { category },
              }}
              className="collection-item"
            >
              {category.name}
            </Link>
          </div>
        ))
      )}
    </Fragment>
  );
};

CategoriesContent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
};

export default CategoriesContent;
