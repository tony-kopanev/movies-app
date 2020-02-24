import React from 'react';
import styled, {createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap');
 
 body {
   padding: 0;
   margin: 0;
   font-family: 'Source Sans Pro', Arial, sans-serif;
 }
`;

const Sort = styled.div `
    width: 100%; 
    max-width: 310px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    min-height: 100%;
    height: 22px;

    .filter-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: -40px;
      position: relative;
      top: 4%;
      right: 0%;
      width: 100%;
      cursor: pointer;
      user-select: none;
      box-sizing: border-box;
      height: 60px;

      &:hover .filter-types-group { opacity: 100%; }
      &:hover .filter-types-group + .filter-type 
        { display: none; }
    }

    .filter-types-group {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      height: auto;
      border: 1px solid rgba(0,0,0,0.1);
      position: relative;
      top: 18%;
      right: ${ p => p.rightTG };
      padding: 7px;
      width: 145px;
      background-color: #fff;
      height: auto;
      min-height: 45px;
      opacity: 0%;
      transition: opacity .5s;
      z-index: 1;

      .filter-type-item {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      font-size: .8rem;
      width: 100%;
      /* max-width: 119px; */

      &:first-child {
        border-bottom: 1px solid green;
        color: #01d277;
        font-size: 1rem;
        line-height: 1rem;
        font-weight: bold;
        margin-bottom: 5px;
        padding-bottom: 5px;
        }
      }
    }

  .filter-type {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: 1px solid green;
    color: #01d277;
    font-size: 1rem;
    line-height: 1rem;
    font-weight: bold;
    margin-bottom: 5px;
    padding-bottom: 5px;
    position: absolute;
    z-index: 0;
    right: 20%;
    transition: .5s;
    width: 100%;
    max-width: 119px;
  }

  .Order {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div i { font-size: .9rem; margin-left: .7rem; }
`;

export const SortFilter = props => {
  const { 
    first, 
    second, 
    setFilterType, 
    arrowDown, 
    setArrowDown
  } = props;

  const rightTG =  first === 'за датою' ? '-22%' : '-18%';

  return (
    <Sort rightTG = { rightTG }>
      <h4>Фільтр:</h4>
      <div className='filter-group'>
        <div className='filter-types-group'>
          <div className='filter-type-item'>{ first }
            <i className="fa fa-chevron-down" aria-hidden="true"></i>
          </div>
          <div 
            className='filter-type-item'
            onClick = { () => setFilterType([second, first])}
          >
            { second }
          </div>
        </div>
        <div className='filter-type'>{ first }
          <i className="fa fa-chevron-down" aria-hidden="true"></i>
        </div>
      </div>
      <div className='Order'><h4>Порядок:</h4> 
        <i 
          className={ !arrowDown ? 'fa fa-arrow-up' : 'fa fa-arrow-down' }
          aria-hidden="true"
          onClick = { () => setArrowDown(!arrowDown) }
        ></i>
      </div>
    </Sort>
  );
};

export const ListWarapper = styled.div `
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
      span {
        cursor: pointer;
        user-select: none;
        transition: .2s;

        &:last-of-type:hover {
          font-size: 1.1rem;
          font-weight: bold;
        }
      }
      
    }
  }
`;