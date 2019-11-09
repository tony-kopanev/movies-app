  import { combineReducers } from 'redux';

  import moviesReducer from './reducers/movieReducer';
  import authReducer from './reducers/auth';
  import fullMovieReducer from './reducers/fullMovieReducer';

  export default combineReducers({
    movies: moviesReducer,
    auth: authReducer,
    fullMovie: fullMovieReducer
  });