import React from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

const Input = ({ type="text", name, placeholder, value, onChangeHandler }) => (
  <input 
    className="Input" 
    type = { type }
    name = { name }
    placeholder= {placeholder} 
    value = {value}
    onChange = {onChangeHandler}
  />
);


Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func
};

export default Input;