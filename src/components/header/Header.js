import React, { useEffect, useState } from 'react';
import './Header.scss';
import logo from '../../assets/cinema-logo.svg';
import { getMovies, searchQuery, searchResultAction, setMovieType, setResponsePageNumber } from '../../redux/action/movies';
import { useDispatch, useSelector } from 'react-redux';

const HEADER_LIST = [
  {
    id: 1,
    iconClass: 'fas fa-film',
    name: 'Now Playing',
    type: 'now_playing'
  },
  {
    id: 2,
    iconClass: 'fas fa-fire',
    name: 'Popular',
    type: 'popular'
  },
  {
    id: 3,
    iconClass: 'fas fa-star',
    name: 'Top Rated',
    type: 'top_rated'
  },
  {
    id: 4,
    iconClass: 'fas fa-plus-square',
    name: 'Upcoming',
    type: 'upcoming'
  }
];

function Header() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const { page, totalPages } = movies;
  const [navClass, setNavClass] = useState(false);
  const [menuClass, setMenuClass] = useState(false);
  const [type, setType] = useState('now_playing');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getMovies(type, page));
    setResponsePageNumber(page, totalPages);

    // eslint-disable-next-line
  }, [type]);

  const setMovieTypeUrl = (type) => {
    setType(type);
    dispatch(setMovieType(type));
  };

  const toggleMenu = () => {
    const navClassClone = navClass;
    setNavClass(!navClassClone);
    setMenuClass(!menuClass);
    if (!navClassClone) {
      document.body.classList.add('header-nav-open');
    } else {
      document.body.classList.remove('header-nav-open');
    }
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    dispatch(searchQuery(e.target.value));
    dispatch(searchResultAction(e.target.value));
  };

  return (
    <div className="header-nav-wrapper">
      <div className="header-bar"></div>
      <div className="header-navbar">
        <div className="header-image">
          <img src={logo} alt="" />
        </div>
        <div className={`${menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'}`} id="header-mobile-menu" onClick={() => toggleMenu()}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`${navClass ? 'header-nav header-mobile-nav' : 'header-nav'}`}>
          {HEADER_LIST.map((data) => (
            <li key={data.id} className={data.type === type ? 'header-nav-item active-item' : 'header-nav-item'} onClick={() => setMovieTypeUrl(data.type)}>
              <span className="header-list-name">
                <i className={data.iconClass}></i>
              </span>
              &nbsp;
              <span className="header-list-name">{data.name}</span>
            </li>
          ))}
          <input className="search-input" type="text" placeholder="Search for a movie" value={search} onChange={onSearchChange} />
        </ul>
      </div>
    </div>
  );
}

export default Header;
