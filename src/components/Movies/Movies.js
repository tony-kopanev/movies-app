import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../UI/Spinner/Spinner';
import Movie from './Movie/Movie';
import './Movies.scss';

// const Movies = ({ moviesList, isFetching }) => {

//   if (moviesList && moviesList.length){
//     const movies = moviesList.map(movie => (
//       <Movie 
//         key={movie.id}
//         movieData = {movie} 
//       />
//     ));

//     return (
//       <div className = 'Movies'>
//         { isFetching && <Spinner /> }
//         {movies}
//       </div>
//     );
//   }

//   return null;

   
// };


class Movies extends Component{
  constructor(props){
    super(props);
    // console.log('[props]', props);
     //console.log('[this.props]', this.props);

    this.state = {};
  };

  render(){
    const { moviesList, isFetching } = this.props;

    if (moviesList && moviesList.length){
      const movies = moviesList.map(movie => (
        <Movie 
          key={movie.id}
          movieData = {movie} 
        />
      ));

      return (
        <div className = 'Movies'>
          {/* { isFetching && <Spinner /> } */}
          {/* {movies} */}
          { isFetching ? <Spinner /> : movies }
        </div>
      );
    }

    return null;
  }
}

Movies.defaultProps = {
  moviesList: null
};

Movies.propTypes = {
  moviesList: PropTypes.array,
  isFetching: PropTypes.bool.isRequired
};

export default Movies;