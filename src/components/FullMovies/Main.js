import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  
  h2{ font-size: 1rem; }
`;

const MainContent = styled(HeaderWrapper) `
  padding: 10px 75px;
  min-height: 100%;
  height: 500px;
`;

const CastList = styled.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 900px;
  min-height: 100%;
  height: auto;
  box-shadow: 0 1px 4px 0px #3a05057d;
  box-sizing: border-box;
  padding-left: 1.5%;
`;

const CastItem = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  flex: 0 1 20%;

  div {
    padding-left: 10px;
    margin-top: 5px;
  }

  h4 { font-size: 1rem; }
  span { font-size: .9rem; }
`;

const Main = ({ casts }) => {
  const castList = casts.map(cast => {
    const { character, name, profile_path, id } = cast;
    const baseImg = 'https://image.tmdb.org/t/p/w138_and_h175_face/';

    return (
      <CastItem key={id}>
        <img src={ baseImg + profile_path } alt={name} title={name} />
        <div>
          <h4>{name}</h4>
          <span>{character}</span>
        </div>
      </CastItem>
    )
  });

    return (
      <Fragment>
        <TitleCast>
        <TitleCastWrapper>
          <h2>В головних ролях:</h2>
        </TitleCastWrapper>
        </TitleCast>
        <MainContent as = "main">
          <CastList>
            {castList}
          </CastList>
        </MainContent>
      </Fragment>
    );
};

Main.propTypes = {
  casts: PropTypes.array.isRequired,
};

export default Main;