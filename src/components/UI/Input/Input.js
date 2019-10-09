import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Input.scss';
import AppContext from '../../../context/appContext';

// const Input = ({ type="text", placeholder, value, onChangeHandler }) => (
//   <input 
//     className="Input" 
//     type = { type }
//     placeholder= {placeholder} 
//     value = {value}
//     onChange = {onChangeHandler}
//   />
// );

class Input extends Component {
  static contextType = AppContext;

  componentDidMount() {
    console.log('[this.context]', this.context);
  }

  render() {
    return (
      <input
        className = 'Input'
        type = {this.props.type}
        placeholder = {this.props.placeholder}
        value = {this.context.value}
        onChange = {this.props.onChangeHandler}
      >
      </input>
    )
  }
}

// const Input = ({ type='text', placeholder, onChangeHandler }) => {

//   return (
//   <AppContext.Consumer>
//          {context => (
//              <input
//                  className="Input"
//                  type={type}
//                  placeholder={placeholder}
//                  value={context.value}
//                  onChange={onChangeHandler}
//              />
//          )}
//   </AppContext.Consumer>
// )}


Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    //value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func
};

export default Input;