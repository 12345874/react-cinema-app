import React, { useState, useEffect, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import '../content/grid/Grid.scss';
import './SearchResult.scss';
import { useSelector } from 'react-redux';
import { IMAGE_URL } from '../../services/movies.service';
import Rating from '../content/rating/Rating';

const SearchResult = (props) => {
  const { searchResult, searchQuery } = useSelector((state) => state.movies);
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(searchResult);
  }, [searchResult]);

  return (
    <div className="searchKeyword">
      <div className="grid-search-title">
        <span className="grid-text1">Your search keyword:</span> <span className="grid-text2">{searchQuery}</span>
      </div>
      <div className="grid">
        {movieData.map((data) => (
          <Fragment key={uuidv4()}>
            {data.poster_path && (
              <div className="grid-cell" style={{ backgroundImage: data.poster_path ? `url(${IMAGE_URL}${data.poster_path})` : '' }}>
                <div className="grid-read-more">
                  <button className="grid-cell-button">Read More</button>
                </div>
                <div className="grid-detail">
                  <span className="grid-detail-title">{data.title}</span>
                  <div className="grid-detail-rating">
                    <Rating rating={data.vote_average} totalStars={10} />
                    &nbsp;&nbsp;
                    <div className="grid-vote-average">{data.vote_average}</div>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

SearchResult.propTypes = {
  searchResult: PropTypes.array.isRequired,
  searchQuery: PropTypes.string.isRequired
};

export default SearchResult;
