import React, {Fragment, Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';

import { getFullDataMovie, unsetMovieData } from '../../store/actions/fullMovie';
import Spinner from '../UI/Spinner/Spinner';

import HeaderSection from './HeaderSection';
import Main from './Main';

// https://api.themoviedb.org/3/movie/550/images?api_key={api_key}&language=en-US&include_image_language=en,null

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap');
 
 body {
   padding: 0;
   margin: 0;
   font-family: 'Source Sans Pro', Arial, sans-serif;
 }
`;

const Wrapper = styled.div `
  padding: 30px 75px;
  padding-top: calc(92px + 30px);
`;

class FullMovies extends Component{

  constructor(props){
    super(props);
    const { match, movieData, getFullDataMovie } = props;
    // ← Back to main

    if(!movieData || match.params.movieID !== movieData.id) getFullDataMovie(match.params.movieID);
  };

  // componentDidMount(){
  //   const { match, movieData, getFullDataMovie } = this.props;

  //   if(!movieData || match.params.movieID !== movieData.id) getFullDataMovie(match.params.movieID);
  // };

  componentWillUnmount(){
    this.props.unsetMovieData();
  }

  shouldComponentUpdate(nextProps){
    return nextProps.credits;
  };

  render(){
    //const { addMoviesToList, movieData, credits } = this.props;
    const { movieData, credits } = this.props;
    // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
    if (movieData && credits){

      return (
        <Fragment>
          <HeaderSection movieData = {movieData} crew = {credits.crew} />
          <Main casts = { credits.cast.slice(0, 10) }/>
          <GlobalStyle />
        </Fragment>
      );
    } else {
      return (
        <Wrapper>
          <Spinner />
        </Wrapper>
      );
    }
  };
}

FullMovies.propTypes = {
  idToken: PropTypes.string,
  match: PropTypes.object.isRequired,
  getFullDataMovie: PropTypes.func.isRequired,
  movieData: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.object
  ]),
  credits: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.object
  ]),
};

const mapStateToProps = state => {
  return {
    movieData: state.fullMovie.movieData,
    idToken: state.auth.idToken,
    credits: state.fullMovie.credits
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFullDataMovie: idMovie => dispatch(getFullDataMovie(idMovie)),
    unsetMovieData: () => dispatch(unsetMovieData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullMovies);