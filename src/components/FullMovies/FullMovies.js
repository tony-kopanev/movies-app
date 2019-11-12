import React, {Fragment, Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getFullDataMovie, unsetMovieData } from '../../store/actions/fullMovie';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';

import {
  GlobalStyle,
  Wrapper,
  HeaderWrapper,
  ImageWrapper,
  TittleWrapper,
  FeaturedCrew,
} from './styledComponentsByFullMovies';

// https://api.themoviedb.org/3/movie/550/images?api_key={api_key}&language=en-US&include_image_language=en,null

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
    const { addMoviesToList, movieData, credits } = this.props;
    // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

    const baseUrlImg = 'https://image.tmdb.org/t/p';
    const sizeImg = '/w500';
    const sizeImgBg = '/w1400_and_h450_face';
    //console.log('[movieData]', movieData);
    console.log('[credits]', credits);
  
    if (movieData && credits){
      const {
        poster_path,
        title,
        original_title,
        overview,
        backdrop_path,
      } = movieData;
      const urlImg = baseUrlImg + sizeImg + poster_path;
      const altImg = title + ' poster';
      const bgImg = baseUrlImg + sizeImgBg + backdrop_path;
      
      const { crew } = credits;
      const directors = crew.filter(crw => crw.job === "Director").map(director => <h3 key={director.id}>{director.name}</h3>);
      const writers = crew.filter(crw => crw.job === "Writer").map(writer => <h3 key={writer.id}>{writer.name}</h3>);


      return (
        <Fragment>
          <HeaderWrapper bgImg = {bgImg}>
            <ImageWrapper>
              <img src={urlImg} alt={altImg} />
            </ImageWrapper>
            <TittleWrapper>
              <h1>{title}</h1>
              <Button clicked = { () => addMoviesToList(original_title) }>Add to list</Button>
              <div className='overview'>
                <h2>Огляд:</h2>
                <p>{overview}</p>
              </div>
              <h2 className = 'FeaturedCrew'>Featured Crew</h2>
              <FeaturedCrew>
                <div>
                  {directors}
                  <span>{directors.length < 2 ? "Director" : "Directors"}</span>
                </div>
                <div>
                  {writers}
                  <span>{writers.length < 2 ? "Writer" : "Writers"}</span>
                </div>
              </FeaturedCrew>
            </TittleWrapper>
          </HeaderWrapper>
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