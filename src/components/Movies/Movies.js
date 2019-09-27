import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../UI/Spinner/Spinner';
import Movie from './Movie/Movie';
import './Movies.scss';

const Movies = ({ moviesList, isFetching }) => {
    const movies = moviesList ? moviesList.map(movie => (
      <Movie 
        key={movie.id}
        movieData = {movie} 
      />
    )) : null;

  return (
    <div className = 'Movies'>
      { isFetching && <Spinner /> }
      {movies}
    </div>
  );
};

Movies.propTypes = {
  moviesList: PropTypes.array,
  isFetching: PropTypes.bool.isRequired
};

export default Movies;