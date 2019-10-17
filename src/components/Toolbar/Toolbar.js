import React from 'react';
import PropTypes from 'prop-types';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './Toolbar.scss';

const Toolbar = ({ search, changed, isFetching, clicked }) => (
  <div className="Toolbar">
      <Input 
        placeholder = "Search..."
        value = {search}
        onChangeHandler = {changed}
      />

      <Button clicked = {clicked}>
        { isFetching ? 'Serching...' : 'Search' }
      </Button>
  </div>
);

Toolbar.propTypes = {
    search: PropTypes.string.isRequired,
    changed: PropTypes.func.isRequired,
    clicked: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default Toolbar;