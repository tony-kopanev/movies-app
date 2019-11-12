import { GET_MOVIE_DATA, UNSET_MOVIE_DATA, GET_CREDITS_DATA } from '../actionsTypes';


// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
// fetch(`${baseURL + idMovie}?api_key=${apiKey}&language=uk-UA`)
// fetch(`${baseURL}?api_key=${apiKey}&id=${idMovie}`)

export const getFullDataMovie = idMovie => {

  const apiKey = '52eae72c07d6cd03afd7491a82451f7b';
  const baseURL = 'https://api.themoviedb.org/3/movie/';

  return dispatch => {
    const requestGetMovies = `${baseURL + idMovie}?api_key=${apiKey}&language=uk-UA`;
    fetch(requestGetMovies)
      .then(res => res.json())
      .then(data => {
        dispatch(getMovieData(data));
      })
      .catch(err => console.log('[err]', err));

      // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>


    const requestGetImgLang = baseURL + idMovie + `/credits?api_key=${apiKey}&language=uk-UA`;
    fetch(requestGetImgLang)
      .then(res => res.json())
      .then(credits => {
        dispatch(getCreditsData(credits));
      })
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