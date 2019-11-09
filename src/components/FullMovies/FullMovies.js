import React, {Fragment, Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getFullDataMovie } from '../../store/actions/fullMovie';
import { Wrapper, HeaderWrapper, ImageWrapper } from './styledComponentsByFullMovies';

// https://api.themoviedb.org/3/movie/550/images?api_key={api_key}&language=en-US&include_image_language=en,null

class FullMovies extends Component{

  componentDidMount(){
    const { match, movieData, getFullDataMovie } = this.props;

    if(!movieData) getFullDataMovie(match.params.movieID);
  };

  shouldComponentUpdate(nextProps){
    return nextProps.imgData;
  };

  render(){
    const { match, movieData, imgData } = this.props;

    return (
      <Fragment>
        <HeaderWrapper>
          <ImageWrapper>
            <img src="#" alt="poster" />
          </ImageWrapper>
        </HeaderWrapper>
        <Wrapper>
          <h1>FullMovies for {match.params.movieID}</h1>
        </Wrapper>
      </Fragment>
    );
  };
}

FullMovies.propTypes = {
  idToken: PropTypes.string,
  match: PropTypes.object.isRequired,
  getFullDataMovie: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    movieData: state.fullMovie.movieData,
    imgData: state.fullMovie.imgData,
    idToken: state.auth.idToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFullDataMovie: idMovie => dispatch(getFullDataMovie(idMovie)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullMovies);