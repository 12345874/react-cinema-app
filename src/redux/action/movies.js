import { MOVIE_API_URL, SEARCH_API_URL } from '../../services/movies.service';
import { LOAD_MORE_RESULTS, MOVIE_LIST, MOVIE_TYPE, RESPONSE_PAGE, SEARCH_QUERY, SEARCH_RESULT } from '../types';
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

export const searchResults = (data) => ({
  type: SEARCH_RESULT,
  payload: data
});

export const searchQuery = (query) => ({
  type: SEARCH_QUERY,
  payload: query
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
      dispatch(loadMoreResults(res));
    } catch (error) {
      if (error.response) {
        dispatch(getError(error.response.data.message));
      }
    }
  };
};

export const searchResultAction = (query) => {
  return async (dispatch) => {
    try {
      if (query) {
        const movies = await SEARCH_API_URL(query);
        const { results } = movies.data;
        dispatch(searchResults(results));
      } else {
        dispatch(searchResults([]));
      }
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
