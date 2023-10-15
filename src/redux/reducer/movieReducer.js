const initialState = {
  list: [],
  page: 1,
  totalPages: 0,
  movieType: 'now_playing',
  searchQuery: '',
  searchResult: [],
  movie: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
