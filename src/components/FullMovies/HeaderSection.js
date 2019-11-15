import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../UI/Button/Button';

const Section = styled.section `
  background: 
  radial-gradient(circle at 20% 50%, rgba(19.61%, 7.84%, 7.84%, 0.98) 0%, rgba(27.45%, 13.73%, 13.73%, 0.88) 100%),
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

  .overview { margin: 20px auto 40px auto; }

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

const HeaderSection = ({ movieData, crew }) => {

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
        releaseYear = release_date.slice(0, 4);

    return (
      <Section bgImg = {bgImg}>
        <HeaderWrapper>
          <ImageWrapper>
            <img src={urlImg} alt={altImg} />
          </ImageWrapper>
          <TittleWrapper>
            <h1>{title}<span> ({releaseYear})</span></h1>
            <Button clicked = { () => {} }>Add to list</Button>
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


