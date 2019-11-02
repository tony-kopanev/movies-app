import { 
  TOGGLE_SUBMITTING,
  AUTHENTICATE_USER,
  SWITCH_AUTH_MODE,
  LOGOUT_USER,
  REMOVE_USER_MOVIES,
  SET_USER_MOVIES
} from '../actionsTypes';

export const authenticateUser = (mode, email, password) => {
  return dispatch => {
    dispatch(toggleSubmitting(true));

    const baseUrl = mode === 'signup'
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

    const apiKey = 'AIzaSyBdQshjgR0sZTEEO8qZiJP33dlj6LU-VsE';
    const options = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })};

    fetch(baseUrl + apiKey, options)
      .then(res => res.json())
      .then(({ idToken, localId }) => {
        dispatch(authenticate(idToken, localId));

        localStorage.setItem('idToken', idToken);
        localStorage.setItem('localId', localId);
      })
      .then(() => dispatch(toggleSubmitting(false)))
      .catch(err => {
        console.log('[err]', err)
        dispatch(toggleSubmitting(false));
      })
  }
}

const toggleSubmitting = status =>{
  return {
    type: TOGGLE_SUBMITTING,
    status
  };
};

export const switchAuthMode = mode =>{
  return {
    type: SWITCH_AUTH_MODE,
    mode
  };
};

export const authenticate = (idToken, localId) => {
  return {
    type: AUTHENTICATE_USER,
    idToken,
    localId
  };
};

export const logoutUser = () => {
  return dispatch => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');
    dispatch(removeUserMovies());
    dispatch(logout());
  }
};

const logout = () => {
  return {
    type: LOGOUT_USER
  }; 
};

const addUserMovies = movies => {
  return {
    type: SET_USER_MOVIES,
    movies
  };
};

export const setUserMovies = localId => {
  return dispatch => {

    const baseUrl = 'https://movies-app-a8b7e.firebaseio.com/';
    fetch(baseUrl + 'movies.json')
      .then(res => res.json())
      .then(data => {
        for(const key in data) {
          const user = data[key];

          if(user.localId === localId) {
            dispatch(addUserMovies(user.list))
          }
        }
      })
      .catch(err => console.log('[err]', err));

  };
};

const removeUserMovies = () => {
  return {
    type: REMOVE_USER_MOVIES,
  }
};