  import { combineReducers } from 'redux';

  import moviesReducer from './reducers/movieReducer';

  export default combineReducers({
    movies: moviesReducer,
  });