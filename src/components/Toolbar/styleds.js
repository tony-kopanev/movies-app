import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap'); `;

export const Header = styled.header`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  padding: 5px 5%;
  background: #262626;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Source Sans Pro', Arial, sans-serif;

  .searchWrapper{ margin: 0 10px; }

  @media screen and (max-width: 991px){
    padding: 5px 12px;
  }

  @media screen and (max-width: 650px){
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: column;
    height: 170px;
    padding: 10px;
  }
`;

export const Logo = styled.div`
  color: #fff;
  height: 70px;
  line-height: 70px;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Source Sans Pro', Arial, sans-serif;

  @media screen and (max-width: 650px){ line-height: 30px; }
`;

export const Menu = styled.nav`
  ul {
    margin: 0;
    padding: 0;
    display: flex;

    li{ 
      list-style: none;
      
      a, span{
        height: 70px;
        line-height: 70px;
        padding: 0 12px;
        color: #fff;
        text-decoration: none;
        display: block;

        &:hover, &.active {
          color: #fff;
          background: #2196f3;
        }
      }
    }
  }

  @media screen and (max-width: 991px){
    position: absolute;
    width: 100%;
    background: #333;
    top: 70px;
    left: ${p => p.enabled ? 0 : "-100%"};
    transition: .5s;

    ul{ 
      justify-content: center;

      li a, li span{ border-bottom: 1px solid #00000033; }
    }
  }

  @media screen and (max-width: 650px){
    height: calc(100vh - 70px);
    top: 170px;

    ul{
      display: block;
      text-align: center;
    }
  }
`;

export const Burger = styled.div`
  color: #fff;
  line-height: 70px;
  font-size: 24px;
  cursor: pointer;
  display: none;

  @media screen and (max-width: 991px){
    display: block;
  }

  @media screen and (max-width: 650px){ line-height: 30px; }
`;

export const InputSerch = (props) => {

const  { clicked, search, change } = props;
 return  (
  <SearchBox>
    <Input 
      change = {change}
      search = {search}
    />
    <Link onClick = {clicked}>
      <i className="fas fa-search" aria-hidden="true"></i></Link>
  </SearchBox>
)};

const SearchBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #2f3640;
  height: 40px;
  border-radius: 40px;
  padding: 10px;
  box-sizing: content-box;
  transition: .4s;

  &:hover > input {
    width: 240px;
    padding: 0 6px;
  }

  &:hover > a { background: white }

  @media screen and (max-width: 650px){ 
    &:hover {
      width: 100%;
      max-width: 300px;
    }
  }
`;

const Link = styled.a`
  color: #e84118;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2f3640;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Input = styled.input.attrs(p => ({
  type: "text",
  placeholder: "введіть запит для пошуку...",
  value: p.search,
  name: "searchField",
  onChange: p.change
}))`
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: white;
  font-size: 16px;
  transition: .4s;
  line-height: 40px;
  width: 0;
`;