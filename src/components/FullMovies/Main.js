import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { HeaderWrapper } from './HeaderSection';

const TitleCast = styled.div `
  max-width: 1920px;
  width: 100%;
  background-color: #ffe9e9;
  box-shadow: 0 1px 4px 1px #3a050545;
`;

const TitleCastWrapper = styled(HeaderWrapper) `
  padding: 10px 75px;
  justify-content: flex-start;
  height: 35px;
  margin-bottom: 30px;
`;

const MainContent = styled(HeaderWrapper) `
  padding: 10px 75px;
  min-height: 100%;
  height: auto;
  flex-direction: column;
`;

const WrapperMainSections = styled.div `
  width: 100%;
  max-width: 900px;
  height: auto;
  box-shadow: 0 1px 4px 0px #3a05057d;
  box-sizing: border-box;
  padding: 15px 15;
  /* padding-left: 1.5%; */
  margin-bottom: 40px;

  &:last-child { margin-bottom: 25px; }

  h2 { 
    font-size: 1.25rem;
    margin: 10px 20px 30px
  } 
`;

const CastList = styled.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  min-height: 100%;
  height: 500px;
`;

const CastItem = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex: 0 1 20%;

  div {
    padding-left: 10px;
    margin-top: 5px;
  }

  h4 { font-size: 1rem; }
  span { font-size: .9rem; }
`;

const Recommendations = styled.div `
  width: 100%;
  max-width: 900px;
  min-height: 100%;
  height: auto;
  min-height: 100%;
  white-space: nowrap;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  box-sizing: border-box;
  padding: 0 20px;
`;

const RecommendationsItem = styled.div `
  flex: 1 0 calc(33% - 7px * 2/3);
  min-height: 100%;
  height: auto;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  &:last-child { margin-right: 0; }

  a {
      text-decoration: none;
      color: #000;
    }
  
  .imgWrapper { 
    width: 100%;
    height: 141px;
    overflow: hidden;
    border-radius: 7px;
    box-shadow: 0 1px 4px 0px #3a05057d;

    img {width: 100%; } 
  }

  .recommTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 5px 10px;

    h5 {
      font-weight: normal;
      font-size: 1rem;
    }

    span { margin-right: 2px; }
    i { font-size: .9rem; }
    
  }
`;

const Main = ({ casts, recommendations }) => {
  const baseImg = 'https://image.tmdb.org/t/p/';
  const imgSizeCast = "w138_and_h175_face/";
  const castList = casts.map(cast => {
    const { character, name, profile_path, id } = cast;
    return (
      <CastItem key={id}>
        <img src={ baseImg + imgSizeCast + profile_path } alt={name} title={name} />
        <div>
          <h4>{name}</h4>
          <span>{character}</span>
        </div>
      </CastItem>
    )
  });

  const imgSizeRecomm = "w250_and_h141_face/";
  const recommList = recommendations.map(recomm => {
    const { id, vote_average, title, poster_path } = recomm;

    return (
      <RecommendationsItem key={id}>
        <Link to = {'/fullMovies/' + id}>
          <div className="imgWrapper">
            <img src={ baseImg + imgSizeRecomm + poster_path } alt={title} title={title} />
          </div>
          <div className="recommTitle">
            <h5>{title}</h5>
            <div className="titleRating">
              <span>{vote_average}</span>
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
          </div>
        </Link>
      </RecommendationsItem>
    )

  })

    return (
      <Fragment>
        <TitleCast>
          <TitleCastWrapper>
          </TitleCastWrapper>
        </TitleCast>
        <MainContent as = "main">
          <WrapperMainSections>
            <h2>В головних ролях:</h2>
            <CastList>
              {castList}
            </CastList>
          </WrapperMainSections>
          <WrapperMainSections>
            <h2>Рекомендації:</h2>
            <Recommendations>
              {recommList}
            </Recommendations>
          </WrapperMainSections>
        </MainContent>
      </Fragment>
    );
};

Main.propTypes = {
  casts: PropTypes.array.isRequired,
  recommendations: PropTypes.array.isRequired,
};

export default Main;