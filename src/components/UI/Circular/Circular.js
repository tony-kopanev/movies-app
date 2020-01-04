import React from 'react';
import styled, { keyframes } from 'styled-components';

const Box = styled.div `
  margin: 0;
  padding: 0;
  text-align: center;
  width: 60px;
  height: 60px;

  &:hover div:last-of-type h2 span { color: #fff; }
  &:hover div:last-of-type h2 { 
    color: #fff;
    font-size: 1.5rem;
   }

   &:hover + h3 {
    color: #fff;
    font-size: 1rem;
    width: 45px;
   }

`;

const Animat = dashoffset => keyframes `
  from{
    stroke-dashoffset: 164;
  }

  to{
    stroke-dashoffset: ${dashoffset};
  }
`;

const Percent = styled.div `
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: inset 0 0 50px #000;
  background: #222;
  z-index: 1000;
`;

const Svg = styled.svg `
  position: relative;
  width: 65px;
  height: 65px;
  z-index: 1000;

  circle {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: ${p => p.trackColor};
    stroke-width: 6;
    stroke-linecap: round;
    transform-origin: center;
    transform: translate(8px,-2px) rotate(-72deg);

    &:nth-child(2) {
      stroke-dasharray: 164;
      stroke-dashoffset: ${p => p.dashoffset};
      stroke: ${p => p.barColor};
      animation: ${p => p.animat} 5s ease;
      animation-delay: 1s;
    }
  }
`;

const Number = styled.div `
  position: relative;
  top: -110%;
  left: 7%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  z-index: 1000;

  h2{
    color: #777;
    font-weight: 700;
    font-size: 1.2rem;
    transition: 0.5s;

    span {
      font-size: .9rem;
      color: #777;
      transition: .5s;
    }
  }
`;

const Text = styled.h3 `
  position: relative;
  color: #777;
  margin: 10px 0 0 15px;
  font-weight: 700;
  font-size: .8rem;
  letter-spacing: 1px;
  transition: .5s;
  word-wrap: break-word;
  width: 35px;
`;

const Wrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circular = ({ dashoffset, rating }) => {
  let barColor, trackColor;
  if(rating < 50) { barColor = '#db2360'; trackColor = '#571435'; }
  else if(rating > 50 && rating < 76) { barColor = '#d2d531'; trackColor = '#423d0f'; }
  else { barColor = '#21d07a'; trackColor = '#204529'; }

    return (
      <Wrapper>
        <Box>
          <Percent>
            <Svg 
              animat = { Animat(dashoffset) } 
              dashoffset = {dashoffset}
              barColor = {barColor}
              trackColor = {trackColor}
            >
              <circle cx='26' cy='26' r='26'></circle>
              <circle cx='26' cy='26' r='26'></circle>
            </Svg>
          </Percent>
          <Number>
            <h2>{rating}<span>%</span></h2>
          </Number>
        </Box>
        <Text>User Score</Text>
      </Wrapper>
    );
};

export default Circular;