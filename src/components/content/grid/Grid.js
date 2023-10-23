/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import './Grid.scss';
import Rating from '../rating/Rating';
import { useSelector } from 'react-redux';
import { IMAGE_URL } from '../../../services/movies.service';

const Grid = () => {
  const moviesList = useSelector((state) => state.movies);
  const { list } = moviesList;

  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(list);
  }, [list]);

  return (
    <>
      <div className="grid">
        {movieData.map((data, i) => (
          <div key={i}>
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
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
