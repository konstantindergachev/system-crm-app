import PropTypes from 'prop-types';
import React from 'react';

const InfoModal = ({ info }) => {
  return <span className="login__info green darken-1">{info}</span>;
};

InfoModal.prototype = {
  info: PropTypes.string,
};

export default InfoModal;
