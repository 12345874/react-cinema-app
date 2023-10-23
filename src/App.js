import './App.css';
import React, { useEffect } from 'react';
import Header from './components/header/Header';
import Main from './components/main/Main';
import { useDispatch } from 'react-redux';
import { getMovies } from './redux/action/movies';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies('now_playing', 1));
  }, []);

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
};

export default App;
