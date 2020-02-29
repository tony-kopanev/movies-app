import React from 'react';
import styled from 'styled-components';
import rgba from '@bit/styled-components.polished.color.rgba';
import { Link } from 'react-router-dom';

import Circular from '../../UI/Circular/Circular';

const Card = styled.div `
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-family: 'Source Sans Pro',Arial,sans-serif;
  box-sizing: border-box;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 420px;
    padding: 60px 0;

    @media screen and (max-width: 1040px){

    padding: 0;

      p {
        width: 100%;
        max-width: 300px;
      }
    }
  }

  &:nth-child(odd) {
    flex-direction: row;
  }

  &:nth-child(even) {
    flex-direction: row-reverse;
    text-align: right;
  }

  &:nth-child(odd) .content {
    align-items: flex-start;

    @media screen and (max-width: 1040px){
      align-items: center;
      p { text-align: left; }
    }
  }

  &:nth-child(even) .content {
    align-items: flex-end;

    @media screen and (max-width: 1040px){
      align-items: center;
      p { text-align: left; }
    }
  }

  .imgBx{
    position: relative;
    left: 25px;
    width: 380px;
    height: 570px;
    z-index: 1;

    img{
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media screen and (max-width: 1040px) {
      width: 100%;
      height: 540px;
      left: 0;
    }
  }

  .contentBx{
    position: relative;
    right: 25px;
    width: 600px;
    height: 450px;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 60px 20px 100px;
    background: radial-gradient(circle at 20% 50%, 
      ${ p => p.bgGrad[0] } 0%, 
      ${ p => p.bgGrad[1] } 100%), 
      url(${ p => p.bgUrl }) no-repeat 50% 50%;

    &::before {
      content: '';
      position: absolute;
      top: -50px;
      bottom: -50px;
      left: 0;
      right: 0;
      background: #000;
      z-index: -1;

      @media screen and (max-width: 1040px) {
        top: 0;
        bottom: 0;
      }
    }

    p {
      margin-top: 10px;
      color: #fff;
      line-height: 1.2rem;
    }

    a, button {
      display: inline-block;
      margin-top: 15px;
      color: #fff;
      text-decoration: none;
      padding: 10px;
      border: 1px solid #fff;
      font-size: .9rem;

      &:hover {
        border-radius: 4px;
        background: ${rgba('#fff', .35)};
      }
      &:active {
        border-radius: 4px;
        background: ${rgba('#fff', .85)};
        color: black;
      }
    }

    button {
      margin-right: 11px;
      background: none;
    }

    @media screen and (max-width: 1040px) {
      width: 100%;
      height: auto;
      right: 0;
      padding: 30px;
      text-align: center;
    }
  }

  &:nth-child(even) .imgBx {
    left: -25px;

    @media screen and (max-width: 1040px) { left: 0; }
  }

  &:nth-child(even) .contentBx {
    right: -25px;
    padding: 20px 100px 20px 60px;

    @media screen and (max-width: 1040px) { 
      right: 0;
      padding: 30px;
    }
  }

  @media screen and (max-width: 1040px) {
    flex-direction: column;
    max-width: 350px;
    margin: 25px;
  }
`;

const TitleAndRating = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 450px;

  h2 { 
    margin-right: 55px;
    font-size: 30px;
    color: #fff;
  }

  @media screen and (max-width: 1040px){
    flex-direction: column;
    align-items: center;
    height: auto;
    min-height: 85px;
    justify-content: space-between;

    h2{
      margin-right: 0;
      font-size: 1.5rem;
    }
  }
`;

const CardMovie = props => {
  const {
    srcImg,
    title,
    overview,
    idToken,
    addMoviesToList,
    id,
    bgGrad,
    bgUrl,
    voteAverage
  } = props;

  return (
    <Card bgGrad = {bgGrad} bgUrl = {bgUrl}>
      <div className='imgBx'>
        <img src = {srcImg} alt = {title} />
      </div>
      <div className='contentBx'>
        <div className='content'>
          <TitleAndRating>
            <h2>{ title }</h2>
            {/* <Circular dashoffset = {dashoffset} rating = {rating} /> */}
            <Circular voteAverage = {voteAverage} modeOptions = 'index' />
          </TitleAndRating>
          <p>{ overview }</p>
          <div>
          { idToken && <button onClick = { () => addMoviesToList(id) } type='button'>Add to list</button> }
          {/* { idToken && <a clicked = { () => addMoviesToList(id) } href='#' >Add to list</a> } */}
          <Link to={'/fullMovies/' + id}>Read More</Link>
  
          </div>
        </div>
      </div>
    </Card>
  );

}

export default CardMovie;