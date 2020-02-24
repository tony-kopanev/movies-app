import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {Header, Logo, Menu, Burger, GlobalStyle} from './styleds';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './Toolbar.scss';

const Toolbar = ({ search, idToken, changed, isFetching, clicked, logout }) => {
  let [onBurger, setOnBurger] = useState(false);

  return (
    <Fragment>
      <Header>
        <Logo>Ant-Films</Logo>
        <div className = "searchWrapper">
          <Input 
            placeholder = "Search..."
            value = {search}
            name = 'searchField'
            onChangeHandler = {changed}
          />
          <Button clicked = {clicked}>
            { isFetching ? 'Serching...' : 'Search' }
          </Button>
        </div>
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


// const Toolbar = ({ search, idToken, changed, isFetching, clicked, logout }) => (
//   <div className="Toolbar">
//       <Input 
//         placeholder = "Search..."
//         value = {search}
//         name = 'searchField'
//         onChangeHandler = {changed}
//       />

//       <strong>Hello, <span>{ idToken ? 'AUTHENTICATED' : 'ANONYMOUS' }</span> user!</strong>

//       <div className = 'ButtonsWrapper'>
//         { idToken && <Button clicked = {logout}>LogOut</Button> }
//         {/* { idToken && <button onClick = {logout}>LogOut</button> } */}
        
//         <Button clicked = {clicked}>
//           { isFetching ? 'Serching...' : 'Search' }
//         </Button>
//       </div>
//   </div>
// );

Toolbar.propTypes = {
    search: PropTypes.string.isRequired,
    idToken: PropTypes.string,
    changed: PropTypes.func.isRequired,
    clicked: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
};

export default Toolbar;