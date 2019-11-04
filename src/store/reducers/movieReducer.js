import * as actionTypes from '../actionsTypes';

export const initialState = {
  isFetching: false,
  moviesList: []
};

const toggleLoading = (state, status) => {
  return {
    ...state,
    isFetching: status
  };
};

const updateMovies = (state, movies) => {
  return {
    ...state,
    moviesList: movies
  };
};


const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.TOGGLE_LOADING: return toggleLoading(state, action.status);
    case actionTypes.UPDATE_MOVIES: return updateMovies(state, action.movies);

    default: return state;
  }
};

export default reducer;