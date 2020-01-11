import {
  AUTHENTICATE_USER,
  TOGGLE_SUBMITTING,
  SWITCH_AUTH_MODE,
  LOGOUT_USER,
  SET_USER_MOVIES,
  REMOVE_USER_MOVIES,
  GET_USER_MOVIES,
  UNSET_USER_MOVIES
} from '../actionsTypes';

const initialState = {
  idToken: null,
  localId: null,
  isSubmitting: false,
  mode: 'signup',
  userMovies: null,
  keyDb: null,
  isAuthcate: false
};

const setUserMovies = (state, movies) => {
  return {
    ...state,
    userMovies: movies
  };
};

const removeUserMovies = state => {
  return {
    ...state,
    userMovies: null
  }
}

const authenticateUser = (state, action) => {
  const { idToken, localId, userMovies, keyDb } = action;
  return {
    ...state,
    idToken,
    localId,
    userMovies,
    keyDb 
  };
};

const toggleSubmitting = (state, status) => {
  return {
    ...state,
    isSubmitting: status
  };
};

const switchAuthMode = (state, mode) => {
  return {
    ...state,
    mode
  };
};

const logoutUser = state => {
  return {
    ...state,
    idToken: '',
    localId: '',
    keyDb: null 
  };
};

const recoveryUserMoviesList = (state, userMovies) => {
  return{
    ...state,
    userMovies
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case AUTHENTICATE_USER: return authenticateUser(state, action);
    case TOGGLE_SUBMITTING: return toggleSubmitting(state, action.status);
    case SWITCH_AUTH_MODE: return switchAuthMode(state, action.mode);
    case LOGOUT_USER: return logoutUser(state);
    case SET_USER_MOVIES: return setUserMovies(state, action.movies);
    case UNSET_USER_MOVIES: return setUserMovies(state, action.movies);
    case REMOVE_USER_MOVIES: return removeUserMovies(state);
    case GET_USER_MOVIES: return recoveryUserMoviesList(state, action.userMovies);

    default: return state;
  }
};

export default reducer;