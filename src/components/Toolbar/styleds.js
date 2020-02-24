import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap')`;

export const Header = styled.header`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  padding: 0 5%;
  background: #262626;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Source Sans Pro', Arial, sans-serif;

  .searchWrapper{ margin: 0 10px; }

  @media screen and (max-width: 991px){
    padding: 0 12px;
  }

  @media screen and (max-width: 650px){
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
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
`;