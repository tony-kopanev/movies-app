import { 
  TOGGLE_SUBMITTING,
  AUTHENTICATE_USER,
  SWITCH_AUTH_MODE,
  LOGOUT_USER,
  REMOVE_USER_MOVIES,
  SET_USER_MOVIES,
  GET_USER_MOVIES
} from '../actionsTypes';

export const authenticateUser = (mode, email, password, history) => {
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
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('localId', localId);
        
        const secret = 'yTCcnymnwnjnjD5dES6HtAlE4qbzIoAJK1zsD8HB';
        const baseUrl = `https://movies-app-a8b7e.firebaseio.com/movies.json?auth=${secret}`;

        fetch(baseUrl)
          .then(res => res.json())
          .then(data => {
            let shouldAddNewData = true;

            for(const key in data){
              if(data[key].localId === localId){
                const list = data[key].list || null;
                shouldAddNewData = false;
                localStorage.setItem('keyDb', key);
                dispatch(authenticate(idToken, localId, key, list));
                break;
              }
            }

            if(shouldAddNewData) {
              const options = {
                method: 'POST',
                body: JSON.stringify({ localId })
              };

              fetch(baseUrl, options)
                .then(res => res.json())
                .then(({name}) => {
                  localStorage.setItem('keyDb', name);
                  dispatch(authenticate(idToken, localId, name));
                })
                .catch(err => console.log('[err]', err))
            }
          })
          .catch(err => console.log('[err]', err))
      })
      .then(() => {
        dispatch(toggleSubmitting(false))
        history.push('/');
      })
      .catch(err => {
        console.log('[err]', err)
        dispatch(toggleSubmitting(false));
      })
  }
};

export const recoveryUserMoviesList = keyDb => {
  return dispatch => {
    const secret = 'yTCcnymnwnjnjD5dES6HtAlE4qbzIoAJK1zsD8HB';
    const baseUrl = `https://movies-app-a8b7e.firebaseio.com/movies/${keyDb}/.json?auth=${secret}`;

    dispatch(toggleSubmitting(true));

    fetch(baseUrl)
      .then(res => res.json())
      .then(data => { if(data.list) dispatch(getUserMovies(data.list)); })
      .then(() => dispatch(toggleSubmitting(false)))
      .catch(err => console.log('[err]', err))
  };
};

const getUserMovies = list => {
  return {
    type: GET_USER_MOVIES,
    userMovies: list
  };
};

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

export const authenticate = (idToken, localId, keyDb, userMovies = null) => {
  return {
    type: AUTHENTICATE_USER,
    idToken,
    localId,
    keyDb,
    userMovies
  };
};

export const logoutUser = () => {
  return dispatch => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');
    localStorage.removeItem('keyDb');
    dispatch(removeUserMovies());
    dispatch(logout());
  }
};

const logout = () => {
  return {
    type: LOGOUT_USER
  }; 
};

export const addUserMovies = movies => {
  return {
    type: SET_USER_MOVIES,
    movies
  };
};

const removeUserMovies = () => {
  return {
    type: REMOVE_USER_MOVIES,
  }
};