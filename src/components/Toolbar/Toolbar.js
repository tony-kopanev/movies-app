import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {Header, Logo, Menu, Burger, GlobalStyle, InputSerch} from './styleds';
import './Toolbar.scss';

const Toolbar = ({ search, idToken, changed, isFetching, clicked, logout }) => {
  let [onBurger, setOnBurger] = useState(false);

  return (
    <Fragment>
      <Header>
        <Logo>Ant-Films</Logo>
        <InputSerch 
          clicked = { clicked } 
          change = {changed} 
          search = {search}  
        />
        <Menu enabled = { onBurger }>  
          <ul>
            <li><NavLink to="/" exact>Зараз у кіно</NavLink></li>
            { idToken && <li><span onClick = { logout }>LogOut</span></li> }
            { 
              !idToken 
                ? <li><NavLink to="/auth">Authentication</NavLink></li> 
                : <li><NavLink to="/list">Movies List</NavLink></li> 
              }
          </ul>
        </Menu>
      <Burger onClick = { () => setOnBurger(!onBurger) } >
        <i className="fa fa-bars" aria-hidden="true"></i>
      </Burger>
      </Header>
      <GlobalStyle />
    </Fragment>
  )
}

Toolbar.propTypes = {
    search: PropTypes.string.isRequired,
    idToken: PropTypes.string,
    changed: PropTypes.func.isRequired,
    clicked: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default Toolbar;