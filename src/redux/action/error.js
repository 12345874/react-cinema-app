import { SET_ERROR } from '../types';

export const getError = (error) => ({
  type: SET_ERROR,
  payload: error
});
