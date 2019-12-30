import React, { Component } from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';

import MoviesLisyStyled from './MoviesLisyStyled'

import { getMovieData } from '../../store/actions/movieListAction';

class MoviesList extends Component {

  shouldComponentUpdate(nextProps){
    const { userMovies, listData } = this.props;
    return userMovies !== nextProps.userMovies || listData !== nextProps.listData;
  };

  componentDidUpdate(prevProps) {
    const { userMovies, getMovieData } = this.props;

    if(!prevProps.userMovies && Array.isArray(userMovies)) {
      getMovieData(userMovies);
    }
  };

  render(){
    const { listData, userMovies } = this.props;
    
    if(!listData.length) return null;
    
    return (
      <MoviesLisyStyled dataList = { listData } userMovies = {userMovies} />
      );
  };
};

const mapStateToProps = state => {
  return {
    listData: state.movieList.listData,
    userMovies: state.auth.userMovies,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovieData: id => dispatch(getMovieData(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);