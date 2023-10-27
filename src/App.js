import './App.css';
import React, { useEffect } from 'react';
import Header from './components/header/Header';
import Main from './components/main/Main';
import { useDispatch } from 'react-redux';
import { getMovies } from './redux/action/movies';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Details from './components/content/details/Details';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies('now_playing', 1));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="app">
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/:id/:name/details" element={<Details />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
