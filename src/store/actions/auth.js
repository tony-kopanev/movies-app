import { TOGGLE_SUBMITTING, AUTHENTICATE_USER, SWITCH_AUTH_MODE } from '../actionsTypes';

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
      .then(({ idToken, localId }) => dispatch(authenticate(idToken, localId)))
      //.then(() => dispatch(toggleSubmitting(false)))
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

const authenticate = (idToken, localId) => {
  return {
    type: AUTHENTICATE_USER,
    idToken,
    localId
  };
};