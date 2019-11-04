import movieReducer, { initialState } from './movieReducer';
import { UPDATE_MOVIES } from '../actionsTypes';

describe('reducers/movieReducer', () => {
  it('should be reducers to equal results', () => {
    const action = {
      type: UPDATE_MOVIES,
      movies: ['NoName']
    };

    const finalResult = {
      ...initialState,
      moviesList: ['NoName']
    };

    expect(movieReducer(undefined, action)).toEqual(finalResult);
  });

  it('should return initial state if no arguments were passed', () => {
    expect(movieReducer(undefined, {type: 'SOMETHING_ELSE'})).toEqual(initialState);
  });
});