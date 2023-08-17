import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import './TextFieldGroup.scss';

const TextFieldGroup = ({
  id,
  placeholder,
  name,
  value,
  onChange,
  error,
  info,
  type,
  category,
  disabled,
}) => {
  return (
    <Fragment>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={
          category ? (ev) => onChange(ev, category) : id ? (ev) => onChange(ev, id) : onChange
        }
        disabled={disabled}
      />
      {info && <small className="form__text text-muted">{info}</small>}
      {error && <div className="invalid__feedback">{error}</div>}
    </Fragment>
  );
};

TextFieldGroup.propTypes = {
  id: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
    PropTypes.instanceOf(FormData).isRequired,
  ]),
  category: PropTypes.string,
  disabled: PropTypes.bool,
};
TextFieldGroup.defaultProps = {
  type: 'text',
};

export default TextFieldGroup;
