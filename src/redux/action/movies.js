import { MOVIE_API_URL } from '../../services/movies.service';
import { LOAD_MORE_RESULTS, MOVIE_LIST, MOVIE_TYPE, RESPONSE_PAGE } from '../types';
import { getError } from './error';

export const getMovieList = (payload) => ({
  type: MOVIE_LIST,
  payload: payload
});

export const loadMoreResults = (payload) => ({
  type: LOAD_MORE_RESULTS,
  payload: payload
});

export const getResponsePage = (payload) => ({
  type: RESPONSE_PAGE,
  payload: payload
});

export const setMovieType = (type) => ({
  type: MOVIE_TYPE,
  payload: type
});

export const getMovies = (type, pageNumber) => {
  return async (dispatch) => {
    try {
      const response = await getMoviesRequest(type, pageNumber);
      const { results, payload } = response;
      dispatch(getMovieList(results));
      dispatch(getResponsePage(payload));
    } catch (error) {
      if (error.response) {
        dispatch(getError(error.response.data.message));
      }
    }
  };
};

export const loadMoreMovies = (type, pageNumber) => {
  return async (dispatch) => {
    try {
      const response = await getMoviesRequest(type, pageNumber);
      const { results, payload } = response;

      const res = { list: results, page: payload.page, totalPages: payload.totalPages };
      console.log(res);
      dispatch(loadMoreResults(res));
    } catch (error) {
      if (error.response) {
        dispatch(getError(error.response.data.message));
      }
    }
  };
};

export const setResponsePageNumber = (payload) => ({
  type: RESPONSE_PAGE,
  payload: payload
});

const getMoviesRequest = async (type, pageNumber) => {
  const movies = await MOVIE_API_URL(type, pageNumber);
  const { results, page, total_pages } = movies.data;
  const payload = {
    page,
    totalPages: total_pages
  };
  return { results, payload };
};
