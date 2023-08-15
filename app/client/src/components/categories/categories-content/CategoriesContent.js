import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../ui/spinner/Spinner';
import './CategoriesContent.scss';

const CategoriesContent = ({ isLoading, categories }) => {
  return (
    <Fragment>
      <div className="page-title">
        <h4>Категорії</h4>
        <Link to="/categories/new" className="waves-effect waves-light btn grey darken-1">
          Додати категорію
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : categories.length === 0 ? (
        <div className="center">У вас немає жодної категорії</div>
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
