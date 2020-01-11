//import React, { Fragment, useState, useEffect } from 'react';
import styled, {createGlobalStyle } from 'styled-components';
//import { useDispatch } from 'react-redux';
//import PropTypes from 'prop-types';

//import { unsetUserMovie } from '../../store/actions/auth';
//import { unsetFromListData } from '../../store/actions/movieListAction';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap');
 
 body {
   padding: 0;
   margin: 0;
   font-family: 'Source Sans Pro', Arial, sans-serif;
 }
`;

export const ListWarapper  = styled.div `
  padding: 30px;
  padding-top: calc(92px + 30px);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1050px;
  height: auto;
  margin: 0 auto;
`;

export const ToolbarList = styled.div `
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 { font-size: 1.5rem; }
  .sort span:first-child{ margin-right: 15px; }
  .sort span{ 
    font-size: 1.1rem;
    font-weight: 300;
   }
  .sort span i { font-size: .9rem; margin-left: .2rem; } 
`;

export const MovieItem = styled.div `
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  min-height: 225px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 35px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fbfaff;

  &:last-child{ margin-bottom: 0; }

  .imgBx {
    flex: 1 0 150px;
    height: 225px;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .contentBx{ 
    padding: 0 25px;
    min-height: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    .titleDate{
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;

      h2{
        font-size: 1.4rem;
        margin-right: 15px;
      };

      span{ 
        font-style: italic;
        font-size: 1rem;
        color: #707070; 
      };
    }

    .buttons{
      display: flex;
      width: 100%;
      max-width: 230px;
      align-items: center;
      justify-content: space-between;
      height: 20px; 

      i { margin: 0 4px .5px 0 }
      span.black { color: black; }
      span.pink { color: #ef47b6; font-weight: bold; }
      span { cursor: pointer; user-select: none; }
    }
  }
`;