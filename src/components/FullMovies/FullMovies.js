import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import { Wrapper, HeaderWrapper, ImageWrapper } from './styledComponentsByFullMovies';

// https://api.themoviedb.org/3/movie/550/images?api_key={api_key}&language=en-US&include_image_language=en,null


const FullMovies = ({idToken, match, fullMovieData}) => {
  const { getMovies, movieData, imgData, getImgLang } = fullMovieData;

  getImgLang(match.params.movieID);
  if(!movieData) getMovies(match.params.movieID);

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

FullMovies.propTypes = {
  idToken: PropTypes.string,
  match: PropTypes.object.isRequired,
  fullMovieData: PropTypes.object.isRequired
};

export default FullMovies;