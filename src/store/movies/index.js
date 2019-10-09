import * as actionTypes from './actionsTypes';

const initialState = {
  sayHello: false,
};

const updateSayHello = (state, action) => {
  return {
    ...state,
    sayHello: action.status
  };
};


const reducer = (state = initialState, action) => {
  switch(action.type){
    case actionTypes.SAY_HELLO: return updateSayHello(state, action);

    default: return state;
  }
};

export default reducer;