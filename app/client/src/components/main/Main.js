import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../layout/footer/Footer';
import Navbar from '../navbar/Navbar';
import { HOME } from '../../constants';

import './Main.scss';

const Main = ({ isAuth, username, logOutClick }) => {
  return (
    <section className="main">
      <Navbar isAuth={isAuth} username={username} logOutClick={logOutClick} />
      <div className="container">
        <h2 className="main__header">
          {HOME.BRAND} <small>{HOME.BRAND_DESCRIPTION}</small>
        </h2>
        <div className="col s12 m5">
          <div className="card-panel grey darken-1">
            {HOME.SECTION_ONE.map((item, idx) => (
              <p className="white-text" key={idx}>
                {item}
              </p>
            ))}
          </div>
        </div>
        <h4>{HOME.TITLE}</h4>
        <div className="row">
          {HOME.SECTION_TWO.map((item, idx) => {
            return (
              <div className="col s12 m5">
                <div className="card-panel grey darken-1" key={idx}>
                  <h5 className="white-text">{item.SUBTITLE}</h5>
                  <p className="white-text">{item.DESCRIPTION}</p>
                </div>
              </div>
            );
          })}
        </div>
        {isAuth ? (
          <Link to="/overview" className="waves-effect waves-light btn">
            {HOME.REMINDER.REVIEW}
          </Link>
        ) : (
          <Link to="/registration" className="waves-effect waves-light btn">
            {HOME.REMINDER.REGESTRATION}
          </Link>
        )}
      </div>
      <Footer />
    </section>
  );
};

Main.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  username: PropTypes.string,
  logOutClick: PropTypes.func.isRequired,
};

export default Main;
