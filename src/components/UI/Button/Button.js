import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ type = 'button', classList, clicked, children }) => {
    return (
        <button 
          className= { classList ? "Button " + classList : "Button" }
          type = {type}
          onClick = {(clicked)}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    classList: PropTypes.oneOfType([ PropTypes.string, PropTypes.bool ]),
    clicked: PropTypes.func,
    // types: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // таким образом можем задавать сразу несколько типов
};

export default Button;