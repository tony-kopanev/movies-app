import { GET_MOVIE_DATA, GET_CREDITS_DATA, UNSET_MOVIE_DATA, GET_RECOMMENDATIONS_DATA } from '../actionsTypes';

const initialState = {
  movieData: null,
  credits: null,
  recommendations: null
};

const getMovieData = (state, data) => {
  return {
    ...state,
    movieData: data
  };
};

const getCreditsData = (state, credits) => {
  return {
    ...state,
    credits
  };
};

const unsetMovieData = state =>{
  return{
    ...state,
    movieData: null,
    credits: null
  };
};

const getRecommendationsData = (state, recommendations) => {
  return {
    ...state,
    recommendations
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case GET_MOVIE_DATA: return getMovieData(state, action.data);
    case UNSET_MOVIE_DATA: return unsetMovieData(state);
    case GET_CREDITS_DATA: return getCreditsData(state, action.credits);
    case GET_RECOMMENDATIONS_DATA: return getRecommendationsData(state, action.recommendations);

    default: return state;
  }
};

export default reducer; 