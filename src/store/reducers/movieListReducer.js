import { ADD_MOVIE_DATA_LIST } from '../actionsTypes';

const initialState = {
  listData: [],
};

const addMovieDataList = (state, data) => {
  
  return {
    ...state,
    listData: data
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case ADD_MOVIE_DATA_LIST: return addMovieDataList(state, action.data);
    default: return state;
  }
};

export default reducer;