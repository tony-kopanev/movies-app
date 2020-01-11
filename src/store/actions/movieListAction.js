import { ADD_MOVIE_DATA_LIST, UNSET_FROM_LIST_DATA } from '../actionsTypes';

export const getMovieData = idList => {
  
  if(!Array.isArray(idList) || !idList.length) return false;
  const apiKey = '52eae72c07d6cd03afd7491a82451f7b';
  const baseURL = 'https://api.themoviedb.org/3/movie/';

  return dispatch => {
    const requests = idList.map(({id}) => fetch(`${baseURL + id}?api_key=${apiKey}&language=uk-UA`));
    
    Promise.all(requests)
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(movies => dispatch(addMovieDataList(movies)))
      .catch(err => console.log('[err]', err))
  };
};


const addMovieDataList = data => {
  return {
    type: ADD_MOVIE_DATA_LIST,
    data
  };
};

export const unsetFromListData = data => {
  return {
    type: UNSET_FROM_LIST_DATA,
    data
  }
};