import React from 'react';
import image from '../../img/sprite.svg';
import { CONTACTS } from '../../constants';

import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer grey darken-1 white-text">
      <span className="copyright">&copy; {new Date().toISOString().split('-')[0]}</span>
      <div className="footer__right">
        <a href={CONTACTS.SURGE} target="_blank" className="social right" rel="noopener noreferrer">
          <svg>
            <use xlinkHref={`${image}#surge`} />
          </svg>
        </a>
        <a
          href={CONTACTS.LINKEDIN}
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
