import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '../../UI/Button/Button';
//import './Movie.scss';
import MovieItem from './MovieItem';
import MovieContent from './MovieContent';

const Movie = ({ movieData, idToken, addMoviesToList, bgGrad }) => {
  const { id, backdrop_path, title, overview, poster_path } = movieData;
  const baseUrl = 'https://image.tmdb.org/t/p/w500/';

  return (
    <MovieItem 
      backgroundParagraph = {`url(${baseUrl+backdrop_path})`}
      backgroundBefore = {bgGrad}
    >
      <h1>{title}</h1>
      <MovieContent>
        <div className="ImageWrapper">
          <img src = {baseUrl+poster_path} alt={title} />
        </div>
        <div className='overviewWrapper'>
          <p>{overview}</p>
          { idToken && <Button clicked = { () => addMoviesToList(id) }>Add to list</Button> }
         </div>
      </MovieContent>
      <Link to={'/fullMovies/' + id} className='LinkButton'>Read More</Link>
      {/* <Button clicked = { () => getFullDataMovie(id, history) }>READ MORE</Button> */}
    </MovieItem>
  )
}

Movie.propTypes = {
  movieData:
    PropTypes.oneOfType(
      [
        PropTypes.object.isRequired,
        PropTypes.oneOf([null]).isRequired,
      ]
    ),
    idToken: PropTypes.string,
    addMoviesToList: PropTypes.func.isRequired,
};

export default Movie;