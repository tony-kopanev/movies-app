import { AUTHENTICATE_USER, TOGGLE_SUBMITTING, SWITCH_AUTH_MODE } from '../actionsTypes';

const initialState = {
  idToken: null,
  localId: null,
  isSubmitting: false,
  mode: 'signup',
};

const authenticateUser = (state, action) => {
  return {
    ...state,
    idToken: action.idToken,
    localId: action.localId
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

const reducer = (state = initialState, action) => {
  switch (action.type){
    case AUTHENTICATE_USER: return authenticateUser(state, action);
    case TOGGLE_SUBMITTING: return toggleSubmitting(state, action.status);
    case SWITCH_AUTH_MODE: return switchAuthMode(state, action.mode);

    default: return state;
  }
};

export default reducer;