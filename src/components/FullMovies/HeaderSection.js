import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Button from '../UI/Button/Button';
import gradients from '../Movies/Movie/gradients';

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

const grad = gradients[randomInteger(0, gradients.length - 1)];

const Section = styled.section `
  background: 
    radial-gradient(circle at 20% 50%, 
      ${ grad[0] } 0%,
      ${ grad[1] } 100%),
    url(${p => p.bgImg}) no-repeat 50% 50%;
  background-size: cover;
  height: auto;
  max-width: 1920px;
  width: 100%;
`;

export const HeaderWrapper = styled.div `
  padding: 30px 75px;
  padding-top: calc(92px + 30px);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

const ImageWrapper = styled.div `
  flex: 1 0 30%;
  margin-right: 3%;
  max-width: 300px;

  img { width: 100% }
`;

const TittleWrapper = styled.div `
  flex: 1 0 60%;
  max-width: 1000px;
  min-height: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: #fff;

  h1, .overview h2 {
    margin-bottom: 15px;
  }

  h1 { 
    font-size: 2.3rem;

    span {
      font-weight: normal;
      font-size: 1.8rem;
      color: #737373;
    } 
  }

  .overview { margin: 20px auto 20px auto; }

  div { margin: 0; }

  p{
    font-size: 1.06rem;
    line-height: 1.6rem;
  }

  .FeaturedCrew { 
    margin-bottom: 15px;
    align-self: flex-start; 
  }
  h2 { font-size: 1.3rem; }
  a { 
    text-decoration: none;
    color: #6b6a6a;
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 10px;

    &:hover { color: #8a8a8a; }
  }
`;

const FeaturedCrew = styled.div `
  display: flex;
  width: 100%;
  max-width: 300px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  h3, span { font-size: .9rem; }
`;

const HeaderSection = ({ movieData, crew, idToken }) => {

  const {
    poster_path,
    title,
    overview,
    backdrop_path,
    release_date
  } = movieData;

  const baseUrlImg  = 'https://image.tmdb.org/t/p',
        sizeImg     = '/w500',
        sizeImgBg   = '/w1400_and_h450_face';

  const urlImg  = baseUrlImg + sizeImg + poster_path,
        altImg  = title + ' poster',
        bgImg   = baseUrlImg + sizeImgBg + backdrop_path;

  const directors   = crew.filter(crw => crw.job === "Director").map(director => <h3 key={director.id}>{director.name}</h3>),
        writers     = crew.filter(crw => crw.job === "Writer").map(writer => <h3 key={writer.id}>{writer.name}</h3>),
        screenplays = crew.filter(crw => crw.job === "Screenplay").map(screenplay => <h3 key={screenplay.id}>{screenplay.name}</h3>),
        releaseYear = release_date.slice(0, 4);
  
  const directorsLabel = directors.length < 2 ? 'Director' : 'Directors';
  let writersLabel, screenplayLabel;
  if(writers.length < 1) {
    screenplayLabel = screenplays.length < 2 ? 'Screenplay' : 'Screenplays';
  } else {
    writersLabel = writers.length < 2 ? 'Writer' : 'Writers';
  }

    return (
      <Section bgImg = {bgImg}>
        <HeaderWrapper>
          <ImageWrapper>
            <img src={urlImg} alt={altImg} />
          </ImageWrapper>
          <TittleWrapper>
            <Link to={"/"}>← Повернутись на головну</Link>
            <h1>{title}<span> ({releaseYear})</span></h1>
            { idToken && <Button clicked = { () => {} }>Add to list</Button> }
            <div className='overview'>
              <h2>Огляд:</h2>
              <p>{overview}</p>
            </div>
            <h2 className = 'FeaturedCrew'>Featured Crew</h2>
            <FeaturedCrew>
              <div>
                {directors}
                <span>{directorsLabel}</span>
              </div>
              <div>
                {writers.length < 1 ? screenplays : writers}
                <span>{writers.length < 1 ? screenplayLabel : writersLabel}</span>
              </div>
            </FeaturedCrew>
          </TittleWrapper>
        </HeaderWrapper>
      </Section>
    );
};

HeaderSection.propTypes = {
  movieData: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.object.isRequired
  ]),
  crew: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.array.isRequired
  ]),
};

export default HeaderSection;


