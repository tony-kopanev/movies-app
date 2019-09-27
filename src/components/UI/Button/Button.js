import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ type = 'button', clicked, children }) => {
    return (
        <button 
          className="Button"
          type = {type}
          onClick = {(clicked)}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    clicked: PropTypes.func,
    // types: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    // таким образом можем задавать сразу несколько типов
};

export default Button;