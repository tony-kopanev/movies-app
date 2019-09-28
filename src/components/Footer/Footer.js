import React from 'react';

import './Footer.scss';

const Footer = () => {
    return (
        <div className="Footer">
            <strong>All Rights Reserved { new Date().getFullYear() }</strong>
        </div>
    );
};

export default Footer;