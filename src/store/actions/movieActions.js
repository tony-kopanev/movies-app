import { TOGGLE_LOADING, UPDATE_MOVIES } from '../actionsTypes';

const toggleLoading = status => {
  return {
    type: TOGGLE_LOADING,
    status
  };
};

const updateMovies = movies => {
  return {
    type: UPDATE_MOVIES,
    movies
  };
};

export const fetchMovies = searchField => {
  return dispatch => {
    // dispatch
    const baseURL = 'https://api.themoviedb.org/3/search/movie';
    const apiKey = '52eae72c07d6cd03afd7491a82451f7b';

    dispatch(toggleLoading(true));

    fetch(`${baseURL}?api_key=${apiKey}&language=en-US&query=${searchField}&page=1&include_adult=false`)
      .then(res => res.json())
      .then(movies => dispatch(updateMovies(movies.results)))
      .then( () => dispatch(toggleLoading(false)) )
      .catch(err => console.log('[err]', err));

      // https://api.themoviedb.org/3/search/movie?api_key=52eae72c07d6cd03afd7491a82451f7b&language=en-US&query=Avengers&page=1&include_adult=false

  }; // end dispatch
};

export const fetchByPopularity = () => {
  return dispatch => {
    dispatch(toggleLoading(true));

    const baseStartURL = "https://api.themoviedb.org/3/discover/movie";
    const baseEndURL = "sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
    const apiKey = '52eae72c07d6cd03afd7491a82451f7b';
  
    const request = baseStartURL + `?api_key=${apiKey}&language=uk-UA&${baseEndURL}`;
      fetch(request)
        .then(res => res.json())
        .then(byPopularity => dispatch(updateMovies(byPopularity.results)))
        .then( () => dispatch(toggleLoading(false)) )
        .catch(err => console.log('[err]', err));
  };
};