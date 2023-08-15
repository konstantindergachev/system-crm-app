import React from 'react';
import image from '../../img/sprite.svg';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer grey darken-1 white-text">
      <span className="copyright">&copy; {new Date().toISOString().split('-')[0]}</span>
      <div className="footer__right">
        <a
          href="http://kostyantyn.dergachov.surge.sh/"
          target="_blank"
          className="social right"
          rel="noopener noreferrer"
        >
          <svg>
            <use xlinkHref={`${image}#surge`} />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/kostyadergachev"
          target="_blank"
          className="social right"
          rel="noopener noreferrer"
        >
          <svg>
            <use xlinkHref={`${image}#in`} />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
