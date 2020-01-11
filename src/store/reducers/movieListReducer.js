import { ADD_MOVIE_DATA_LIST, UNSET_FROM_LIST_DATA } from '../actionsTypes';

const initialState = {
  listData: false,
};

const addMovieDataList = (state, data) => {
  return {
    ...state,
    listData: data
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type){
    case ADD_MOVIE_DATA_LIST:
    case UNSET_FROM_LIST_DATA: return addMovieDataList(state, action.data);
    default: return state;
  }
};

export default reducer;