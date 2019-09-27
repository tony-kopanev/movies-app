import React from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

const Input = ({ type="text", placeholder, value, onChangeHandler }) => (
  <input 
    className="Input" 
    type = { type }
    placeholder= {placeholder} 
    value = {value}
    onChange = {onChangeHandler}
  />
);

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default Input;