import React from 'react';
import CardMovie from './CardMovie';
import PropTypes from 'prop-types';

const Movie = ({ movieData, idToken, addMoviesToList, bgGrad }) => {
  const { id, backdrop_path, title, overview, poster_path, vote_average } = movieData;
  const baseUrl = 'https://image.tmdb.org/t/p/w500/';
  const backdropUrl = 'https://image.tmdb.org/t/p/w1400_and_h450_face' + backdrop_path;

  // const rating = vote_average * 10;
  // const dashoffset = 164 - Math.ceil(164 * (rating / 100));

  const overviewText = overview.length > 325 
    ? overview.slice(0, 322) + ' ...' 
    : overview;

  return (
      <CardMovie 
        srcImg = {baseUrl + poster_path}
        title = {title}
        overview = {overviewText}
        idToken = {idToken}
        addMoviesToList = {addMoviesToList}
        id = {id}
        bgGrad = {bgGrad}
        bgUrl = {backdropUrl}
        voteAverage = {vote_average}
      />
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
    idToken: PropTypes.string,
    addMoviesToList: PropTypes.func.isRequired,
    bgGrad:
      PropTypes.oneOfType(
        [
          PropTypes.array.isRequired,
          PropTypes.oneOf([null]).isRequired,
        ]
      ),
};

export default Movie;