import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//import Button from '../../UI/Button/Button';
import './Movie.scss';

const Movie = ({ movieData }) => {
  const { id, backdrop_path, title, overview, poster_path } = movieData;
  const baseUrl = 'https://image.tmdb.org/t/p/w500/';
  //const baseUrl = 'https://image.tmdb.org/t/p/original/';

  return (
    <div className="Movie" style = {{ backgroundImage: `url(${baseUrl+backdrop_path})` }}>
      <h1>{title}</h1>
  
      <div className="MovieContent">
        <div className="ImageWrapper">
          <img src = {baseUrl+poster_path} alt={title} />
        </div>
  
        <p>{overview}</p>
      </div>
  
      <Link to={'/' + id} className='LinkButton'>Read More</Link>
      {/* <Button>READ MORE</Button> */}
    </div>
  );
}

Movie.propTypes = {
  movieData:
    PropTypes.oneOfType(
      [
        PropTypes.object.isRequired,
        PropTypes.oneOf([null]).isRequired,
      ]
    ),
};

export default Movie;