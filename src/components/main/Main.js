import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMoreMovies } from '../../redux/action/movies';
import MainContent from '../content/main-content/MainContent';
import SearchResult from '../search-result/SearchResult';
import Spinner from '../spinner/Spinner';
import './Main.scss';

function Main() {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies);
  const { page, totalPages, movieType, searchResult } = movies;

  const [currentPage, setCurrentPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const mainRef = useRef();
  const bottomLineRef = useRef();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const fetchData = () => {
    let pageNumber = currentPage;
    if (page < totalPages) {
      pageNumber += 1;
      setCurrentPage(pageNumber);
      dispatch(loadMoreMovies(movieType, pageNumber));
    }
  };

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineTop } = bottomLineRef.current.getBoundingClientRect();
    if (bottomLineTop <= containerHeight) {
      // fetch data
      fetchData();
    }
  };
  return (
    <>
      <div className="main" ref={mainRef} onScroll={handleScroll}>
        {loading ? <Spinner /> : <>{searchResult && searchResult.length === 0 ? <MainContent /> : <SearchResult />}</>}
        <div ref={bottomLineRef}></div>
      </div>
    </>
  );
}

export default Main;
