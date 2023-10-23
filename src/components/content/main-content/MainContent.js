import React, { useEffect, useState } from 'react';
import './MainContent.scss';
import SlideShow from '../slide-show/SlideShow';
import Paginate from '../paginate/Paginate';
import Grid from '../grid/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_URL } from '../../../services/movies.service';
import { getMovies, setResponsePageNumber } from '../../../redux/action/movies';

function MainContent() {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies);
  const { list, movieType, page, totalPages } = movies;
  const [currentPage, setCurrentPage] = useState(page);
  const [images, setImages] = useState([]);
  const randomMovies = list && list.sort(() => Math.random() - Math.random()).slice(0, 4);

  const HEADER_TYPE = {
    now_playing: 'Now Playing',
    popular: 'Popular',
    top_rated: 'Top Rated',
    upcoming: 'Upcoming'
  };

  useEffect(() => {
    if (randomMovies.length) {
      const IMAGES = [
        {
          id: 1,
          url: `${IMAGE_URL}${randomMovies[0].backdrop_path}`
        },
        {
          id: 2,
          url: `${IMAGE_URL}${randomMovies[1].backdrop_path}`
        },
        {
          id: 3,
          url: `${IMAGE_URL}${randomMovies[2].backdrop_path}`
        },
        {
          id: 4,
          url: `${IMAGE_URL}${randomMovies[3].backdrop_path}`
        }
      ];
      setImages(IMAGES);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrentPage(page);
    // eslint-disable-next-line
  }, [page, totalPages]);

  const paginate = (type) => {
    let pageNumber = currentPage;
    if (type === 'prev' && currentPage >= 1) {
      pageNumber -= 1;
    } else {
      pageNumber += 1;
    }
    setCurrentPage(pageNumber);
    const payload = { page: pageNumber, totalPages: totalPages };
    dispatch(setResponsePageNumber(payload));
    dispatch(getMovies(movieType, pageNumber));
  };

  return (
    <div className="main-content">
      {images.length > 0 && <SlideShow images={images} auto={true} showArrow={true} />}
      <div className="grid-movie-title">
        <div className="movieType">{HEADER_TYPE[movieType]}</div>
        <div className="paginate">
          <Paginate currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        </div>
      </div>
      <Grid />
    </div>
  );
}

export default MainContent;
