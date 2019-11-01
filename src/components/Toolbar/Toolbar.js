import React from 'react';
import PropTypes from 'prop-types';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './Toolbar.scss';

const Toolbar = ({ search, idToken, changed, isFetching, clicked, logout }) => (
  <div className="Toolbar">
      <Input 
        placeholder = "Search..."
        value = {search}
        name = 'searchField'
        onChangeHandler = {changed}
      />

      <strong>Hello, <span>{ idToken ? 'AUTHENTICATED' : 'ANONYMOUS' }</span> user!</strong>

      <div className = 'ButtonsWrapper'>
        { idToken && <Button clicked = {logout}>LogOut</Button> }
        
        <Button clicked = {clicked}>
          { isFetching ? 'Serching...' : 'Search' }
        </Button>
      </div>
  </div>
);

Toolbar.propTypes = {
    search: PropTypes.string.isRequired,
    idToken: PropTypes.string,
    changed: PropTypes.func.isRequired,
    clicked: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default Toolbar;