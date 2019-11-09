import { GET_MOVIE_DATA, GET_IMG_DATA } from '../actionsTypes';

const initialState = {
  movieData: null,
  imgData: null
};

const getMovieData = (state, data) => {
  return {
    ...state,
    movieData: data
  };
};

const getImgData = (state, data) => {
  return {
    ...state,
    imgData: data
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case GET_MOVIE_DATA: return getMovieData(state, action.data);
    case GET_IMG_DATA: return getImgData(state, action.data);

    default: return state;
  }
};

export default reducer; 