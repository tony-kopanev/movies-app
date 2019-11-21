import {
  GET_MOVIE_DATA,
  UNSET_MOVIE_DATA,
  GET_CREDITS_DATA,
  GET_RECOMMENDATIONS_DATA,
  TOGGLE_LOADING_FULL_MOVIE
} from '../actionsTypes';
//import { browserHistory } from 'react-router'
//import { createBrowserHistory } from 'history';



// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
// fetch(`${baseURL + idMovie}?api_key=${apiKey}&language=uk-UA`)
// fetch(`${baseURL}?api_key=${apiKey}&id=${idMovie}`)

export const getFullDataMovie = idMovie => {

  const apiKey = '52eae72c07d6cd03afd7491a82451f7b';
  const baseURL = 'https://api.themoviedb.org/3/movie/';
  //const browserHistory = createBrowserHistory();

  return dispatch => {
    const requestGetMovies = `${baseURL + idMovie}?api_key=${apiKey}&language=uk-UA`;
    dispatch(toggleLoadingFullMovie(true));

    fetch(requestGetMovies)
      .then(res => res.json())
      .then(data => dispatch(getMovieData(data)))
      .catch(err => console.log('[err]', err));

    const requestGetCredits = baseURL + idMovie + `/credits?api_key=${apiKey}&language=uk-UA`;
    fetch(requestGetCredits)
      .then(res => res.json())
      .then(credits => dispatch(getCreditsData(credits)))
      .catch(err => console.log('[err]', err));

    const requestGetRecommendations = baseURL + idMovie + `/recommendations?api_key=${apiKey}&language=uk-UA&page=1`;
    fetch(requestGetRecommendations)
      .then(res => res.json())
      .then(recommendations => dispatch(getRecommendationsData(recommendations.results)))
      .then(() => dispatch(toggleLoadingFullMovie(false)))
      .catch(err => console.log('[err]', err));
  };
};

const getMovieData = data => {
  return {
    type: GET_MOVIE_DATA,
    data
  };
};

export const unsetMovieData = () => { return  { type: UNSET_MOVIE_DATA }; };

const getCreditsData = credits => {
  return {
    type: GET_CREDITS_DATA,
    credits
  };
};

const getRecommendationsData = recommendations => {
  return {
    type: GET_RECOMMENDATIONS_DATA,
    recommendations
  };
};

const toggleLoadingFullMovie = status => {
  return {
    type: TOGGLE_LOADING_FULL_MOVIE,
    status
  }
}