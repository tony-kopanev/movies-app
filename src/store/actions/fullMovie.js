import { GET_MOVIE_DATA, GET_IMG_DATA } from '../actionsTypes';


// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
// fetch(`${baseURL + idMovie}?api_key=${apiKey}&language=uk-UA`)
// fetch(`${baseURL}?api_key=${apiKey}&id=${idMovie}`)

export const getMovies = idMovie => {

  const apiKey = '52eae72c07d6cd03afd7491a82451f7b';
  const baseURL = 'https://api.themoviedb.org/3/movie/';

  return dispatch => {
    console.log('yes1');

    const request = `${baseURL + idMovie}?api_key=${apiKey}&language=uk-UA`;
  
    fetch(request)
      .then(res => res.json())
      .then(data => {
        dispatch(getMovieData(data));
      })
      .catch(err => console.log('[err]', err));
  };
};

export const getImgLang = idMovie => {
  const baseUrl = "https://api.themoviedb.org/3/movie/";
  const apiKey = '52eae72c07d6cd03afd7491a82451f7b';
  
  return dispatch => {

    const request = baseUrl + idMovie + `/images?api_key=${apiKey}&language=uk-UA&include_image_language=uk,null`;
    console.log('yes');
    
    fetch(request)
    .then(res => res.json())
    .then(data => {
      console.log('[data]', data);
      dispatch(getImgData(data));
    })
    .catch(err => console.log('[err]', err));
  };

}

const getMovieData = data => {
  return {
    type: GET_MOVIE_DATA,
    data
  };
};

const getImgData = data => {
  return {
    type: GET_IMG_DATA,
    data
  };
};