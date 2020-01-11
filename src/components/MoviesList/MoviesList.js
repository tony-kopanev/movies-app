import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import PropTypes from 'prop-types';

import { ListWarapper, ToolbarList, GlobalStyle, MovieItem} from './MoviesLisyStyled'
import { getMovieData, unsetFromListData } from '../../store/actions/movieListAction';
import { unsetUserMovie } from '../../store/actions/auth';

const MoviesList = () => {
  
  const listData = useSelector(state => state.movieList.listData);
  const userMovies = useSelector(state => state.auth.userMovies);
  const dispatch = useDispatch();
  let [ userMoviesLength, setUserMoviesLength ] = useState(0);
  let [ arrowDown, setArrowDown ] = useState(false);

  useEffect(() => {
    if(Array.isArray(userMovies) && userMovies.length !== userMoviesLength) {

      if(listData.length) {
        const newDataList = listData.filter(mov => userMovies.map(item => item.id).includes(mov.id));
  
        if(newDataList.length !== listData.length){
          dispatch(unsetFromListData(newDataList));
        }
      } else if(!Array.isArray(listData)) {
        dispatch(getMovieData(userMovies));
        setUserMoviesLength(userMovies.length);
        console.log('update listData');
      }
    }
  // eslint-disable-next-line
  }, [userMovies]);

  if(Array.isArray(listData)){
    for(const favItem of listData)
      for(const uMovie of userMovies)
        if(favItem.id === uMovie.id) favItem.dateAdded = uMovie.date;

    if(!arrowDown) listData.sort((a, b) => a.dateAdded > b.dateAdded ? 1 : -1);
    else listData.sort((a, b) => a.dateAdded > b.dateAdded ? -1 : 1);

    const mouseOverSpan = event => {
      const i = event.target.tagName === 'I' ? event.target : event.target.firstElementChild;
      const span = event.target.tagName === 'SPAN' ? event.target : event.target.parentElement;

      i.className = "fa fa-times-circle";
      i.style.fontSize = '1.1rem';
      i.style.fontWeight = 'bold';

      span.style.fontSize = '1.1rem';
      span.style.fontWeight = 'bold';
      span.lastChild.textContent = 'видалити';
    };

    const mouseOutSpan = event => {
      const i = event.target.tagName === 'I' ? event.target : event.target.firstElementChild;
      const span = event.target.tagName === 'SPAN' ? event.target : event.target.parentElement;
      
      i.style = '';
      span.style = '';
      span.lastChild.textContent = 'улюбленi';
      i.className = "fa fa-heart";
    };

    const favotiteMovies = listData.map(movie => {
    
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
              <span 
                className = "pink"
                data-favorites = {id}
                onMouseOver = {mouseOverSpan}
                onMouseOut = {mouseOutSpan}
              >
                <i  className="fa fa-heart" aria-hidden="true" ></i> улюбленi
              </span>
              <span><i className="fa fa-times-circle" aria-hidden="true"></i> видалити</span>
            </div>
          </div>
        </MovieItem>
      )});

    const handlerForUpfateFavorites = event => {
      if(!event.target.closest('span')) return;
      const span = event.target.closest('span');
      if(!span.dataset.favorites) return;
      
      const id = +span.dataset.favorites;

      const result = userMovies.filter(mov => mov.id !== id);
      if(result.length === userMovies.length) return;

      dispatch(unsetUserMovie(result))  
    };

    return (
      <Fragment>
        <ListWarapper onClick = {handlerForUpfateFavorites}>
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
  } else {
    console.log('listData is not array!')
    return null;
  };
  // if(!listData.length) return null;

};

export default MoviesList;