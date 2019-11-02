  import { combineReducers } from 'redux';

  import moviesReducer from './reducers/movieReducer';
  import authReducer from './reducers/auth';

  export default combineReducers({
    movies: moviesReducer,
    auth: authReducer,
  });