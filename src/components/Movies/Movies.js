//import React, { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../UI/Spinner/Spinner';
import gradients from './Movie/gradients';
import Movie from './Movie/Movie';
import './Movies.scss';

const Movies = ({ moviesList, isFetching, idToken, addMoviesToList }) => {

  if (moviesList && moviesList.length){

    let bgID = 0;
    const movies = moviesList.map(movie => {

      if(bgID === gradients.length) bgID = 0;
      const bgGrad = gradients[bgID];
      bgID ++;
      //console.log('[bgGrad]', bgGrad);
      
      return (
      <Movie 
        key={movie.id}
        movieData = {movie}
        idToken = {idToken}
        addMoviesToList = {addMoviesToList}
        bgGrad = {bgGrad}
      />
    )});

    return (
      <div className = 'Movies'>
        { isFetching && <Spinner /> }
        {movies}
      </div>
    );
  }

  return null; 
};


// class Movies extends Component{
//   constructor(props){
//     super(props);
//     // console.log('[props]', props);
//      //console.log('[this.props]', this.props);

//     this.state = {};
//   };

//   render(){
//     const { moviesList, isFetching } = this.props;

//     if (moviesList && moviesList.length){
//       const movies = moviesList.map(movie => (
//         <Movie 
//           key={movie.id}
//           movieData = {movie} 
//         />
//       ));

//       return (
//         <div className = 'Movies'>
//           {/* { isFetching && <Spinner /> } */}
//           {/* {movies} */}
//           { isFetching ? <Spinner /> : movies }
//         </div>
//       );
//     }

//     return null;
//   }
// }

Movies.defaultProps = {
  moviesList: null
};

Movies.propTypes = {
  moviesList: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  idToken: PropTypes.string,
  addMoviesToList: PropTypes.func.isRequired,
};

export default Movies;