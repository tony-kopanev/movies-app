import React, { Fragment, useState } from 'react';
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
  .sort span i { font-size: .9rem; margin-left: .2rem; } 
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
      height: 20px; 

      i { margin: 0 4px .5px 0 }
    }
  }
`;

const MoviesLisyStyled = ({ dataList, userMovies }) => {

  let [ arrowDown, setArrowDown ] = useState(false);

  for(const favItem of dataList)
    for(const uMovie of userMovies)
      if(favItem.id === uMovie.id) favItem.dateAdded = uMovie.date;

  if(!arrowDown) dataList.sort((a, b) => a.dateAdded > b.dateAdded ? 1 : -1);
  else dataList.sort((a, b) => a.dateAdded > b.dateAdded ? -1 : 1);

  const favotiteMovies = dataList.map((movie, i) => {
    
    const { poster_path, id, title, overview } = movie;
    const srcImg = 'https://image.tmdb.org/t/p/w150_and_h225_bestv2' + poster_path;

    const date = new Date(movie.dateAdded).toLocaleDateString('ru-Ru', { hour: "2-digit", minute: "2-digit", second: "2-digit" });
       
    return (
      <MovieItem key = {id}>
        <div className='imgBx'><img src = { srcImg } alt= { title } /></div>
        <div className='contentBx'>
          <div className='titleDate'>
            <h2>{ title }</h2>
            <span>{ date }</span>
          </div>
          <p>{ overview }</p>
          <div className='buttons'>
            <span><i className="fa fa-heart" aria-hidden="true"></i> улюбленi</span>
            <span><i className="fa fa-times-circle" aria-hidden="true"></i> видалити</span>
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
            <span>Порядок: 
              <i 
                className={ !arrowDown ? 'fa fa-arrow-up' : 'fa fa-arrow-down' }
                aria-hidden="true"
                onClick = { () => setArrowDown(!arrowDown) }
              ></i></span>
          </div>
        </ToolbarList>
        { favotiteMovies }
      </ListWarapper>
      <GlobalStyle />
    </Fragment>
  );
};

export default MoviesLisyStyled;