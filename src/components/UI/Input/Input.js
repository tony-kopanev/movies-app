import React from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

const Input = ({ type="text", classList, name, placeholder, value, onChangeHandler, onBlurHandler }) => (
  <input
    className= { classList ? "Input " + classList : "Input" } 
    type = { type }
    name = { name }
    placeholder= {placeholder} 
    value = {value}
    onChange = {onChangeHandler}
    onBlur = {onBlurHandler}
  />
);


Input.propTypes = {
    type: PropTypes.string,
    classList: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    onBlurHandler: PropTypes.func
};

export default Input;