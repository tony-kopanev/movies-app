import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Footer.scss';

const Footer = ({ idToken }) => {
    return (
        <div className="Footer">
            <strong>All Rights Reserved { new Date().getFullYear() }</strong>
            <ul>
              <li><NavLink to="/" exact>Home</NavLink></li>
              { !idToken && <li><NavLink to="/auth">Authentication</NavLink></li> }
            </ul>
        </div>
    );
};

Footer.propTypes = {
    idToken: PropTypes.string
};

export default Footer;