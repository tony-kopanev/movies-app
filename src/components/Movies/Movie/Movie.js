import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';
import './Movie.scss';

const Movie = ({ movieData }) => {
  const { backdrop_path, title, overview, poster_path } = movieData;
  const baseUrl = 'https://image.tmdb.org/t/p/w500/'
  console.log('[title]', title);
  return (
    <div className="Movie" style = {{ backgroundImage: `url(${baseUrl+backdrop_path})` }}>
      <h1>{title}</h1>
  
      <div className="MovieContent">
        <div className="ImageWrapper">
          <img src = {poster_path} alt={title} />
        </div>
  
        <p>{overview}</p>
      </div>
  
      <Button>READ MORE</Button>  
    </div>
  );
}

Movie.propTypes = {
    
};

export default Movie;