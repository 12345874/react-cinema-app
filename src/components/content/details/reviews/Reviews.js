import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './Reviews.scss';

const Reviews = () => {
  const { movie } = useSelector((state) => state.movies);
  const [reviews] = useState(movie[4]);

  return (
    <>
      <div className="movie-reviews">
        <div className="div-title">Reviews {reviews.results.length > 0 ? reviews.results.length : ''}</div>
        {reviews.results.length ? (
          reviews.results.map((data, i) => (
            <div className="reviews" key={i}>
              <h3>{data.author}</h3>
              <div>{data.content}</div>
            </div>
          ))
        ) : (
          <p>No reviews to show</p>
        )}
      </div>
    </>
  );
};

export default Reviews;
