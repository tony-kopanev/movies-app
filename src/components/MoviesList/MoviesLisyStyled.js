import React, { Fragment } from 'react';
import styled, {createGlobalStyle } from 'styled-components';
//import PropTypes from 'prop-types';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap');
 
 body {
   padding: 0;
   margin: 0;
   font-family: 'Source Sans Pro', Arial, sans-serif;
 }
`;

const ListWarapper  = styled.div `
  padding: 30px;
  padding-top: calc(92px + 30px);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1050px;
  height: auto;
  margin: 0 auto;
`;

const ToolbarList = styled.div `
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
  .sort span i { font-size: .9rem; } 
`;

const MovieItem = styled.div `
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
      max-width: 200px;
      align-items: center;
      justify-content: space-between;
    }
  }


`;


const MoviesLisyStyled = ({ dataList }) => {

  const favotiteMovies = dataList.map(movie => {
    
    const { poster_path, id, title, overview } = movie;
    const srcImg = 'https://image.tmdb.org/t/p/w150_and_h225_bestv2' + poster_path;
    return (
      <MovieItem key = {id}>
        <div className='imgBx'><img src = { srcImg } alt= { title } /></div>
        <div className='contentBx'>
          <div className='titleDate'>
            <h2>{ title }</h2>
            <span>{ new Date(Date.now()).toLocaleDateString('ru-Ru', { hour: "2-digit", minute: "2-digit", second: "2-digit" }) }</span>
          </div>
          <p>{ overview }</p>
          <div className='buttons'>
            <span><i class="fa fa-heart" aria-hidden="true"></i> улюбленi</span>
            <span><i class="fa fa-times-circle" aria-hidden="true"></i> видалити</span>
          </div>
        </div>
      </MovieItem>
    )});

    return (
      <Fragment>
        <ListWarapper>
          <ToolbarList>
            <h1>Мої уподобання</h1>
            <div className='sort'>
              <span>Фільтр за: датою <i className="fa fa-chevron-down" aria-hidden="true"></i></span>
              <span>Порядок: <i className="fa fa-arrow-up" aria-hidden="true"></i></span>
            </div>
          </ToolbarList>
          { favotiteMovies }
        </ListWarapper>
        <GlobalStyle />
      </Fragment>
    );
};

export default MoviesLisyStyled;