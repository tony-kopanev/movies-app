import React from 'react';
import styled, { keyframes } from 'styled-components';

const Box = styled.div `
  margin: 0;
  padding: 0;
  text-align: center;
  width: ${p => p.sizing}px;
  height: ${p => p.sizing}px;

  &:hover div:last-of-type h3 span { color: #fff; }
  &:hover div:last-of-type h3 { 
    color: #fff;
    font-size: ${p => p.DivH3}rem;
   }

   &:hover + h3 {
    color: #fff;
    font-size: ${p => p.h3}rem;
    width: ${p => p.h3Width}px;
   }

`;

const Animat = (dashOffset, dashArray) => keyframes `
  from{
    stroke-dashoffset: ${dashArray};
  }

  to{
    stroke-dashoffset: ${dashOffset};
  }
`;

const Percent = styled.div `
  position: relative;
  width: ${p => p.sizing}px;
  height: ${p => p.sizing}px;
  border-radius: 50%;
  box-shadow: inset 0 0 50px #000;
  background: #222;
  z-index: 1000;
`;

const Svg = styled.svg `
  position: relative;
  width: ${p => p.sizing}px;
  height: ${p => p.sizing}px;
  z-index: 1000;

  circle {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: ${p => p.trackColor};
    stroke-width: ${p => p.strokeWidth};
    stroke-linecap: round;
    transform-origin: center;
    transform: ${p => p.transformCircle};

    &:nth-child(2) {
      stroke-dasharray: ${p => p.dashArray};
      stroke-dashoffset: ${p => p.dashOffset};
      stroke: ${p => p.barColor};
      animation: ${p => p.animat} 5s ease;
      animation-delay: 1s;
    }
  }
`;

const Number = styled.div `
  position: relative;
  top: ${p => p.top}%;
  left: ${p => p.left}%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  z-index: 1000;

  h3{
    color: #777;
    font-weight: 700;
    font-size: ${p => p.h3}rem;
    transition: 0.5s;

    span {
      font-size: ${p => p.span}rem;
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
  width: ${p => p.sizing}px;
`;

const Wrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circular = ({ voteAverage, modeOptions }) => {
  let barColor, trackColor, options;

  const indexOptions = {
    box: 40,
    box_div_h3: 1,
    box_h3: .9,
    box_h3_width: 55,
    precent: 55,
    svg: 50,
    circle_width: 5,
    transform: 'translate(6px,-1px) rotate(-72deg)',
    radius: 20,
    number_top: -115,
    number_left: 22,
    number_h3: .8,
    number_span: .6,
    text_width: 45,
  };

  const fullOptions = {
    box: 60,
    box_div_h3: 1.5,
    box_h3: 1,
    box_h3_width: 45,
    precent: 70,
    svg: 65,
    circle_width: 6,
    transform: 'translate(8px,-2px) rotate(-72deg);',
    radius: 26,
    number_top: -110,
    number_left: 7,
    number_h3: 1.2,
    number_span: .9,
    text_width: 35,
  };

  switch(modeOptions) {
    case 'index': options = indexOptions; break;
    case 'full': options = fullOptions; break;
    default: options = indexOptions;
  }

  const radius = options.radius;
  const dashArray = Math.ceil(2 * Math.PI * radius); 
  const rating = voteAverage * 10;
  const dashOffset = dashArray - Math.ceil(dashArray * (rating / 100));

  if(rating < 50) { barColor = '#db2360'; trackColor = '#571435'; }
  else if(rating > 50 && rating < 76) { barColor = '#d2d531'; trackColor = '#423d0f'; }
  else { barColor = '#21d07a'; trackColor = '#204529'; }



  console.log('[dashArray]', dashArray);

    return (
      <Wrapper>
        <Box 
          sizing = {options.box}
          DivH3 = {options.box_div_h3}
          h3 = {options.box_h3}
          h3Width = {options.box_h3_width}
        >
          <Percent sizing={options.precent}>
            <Svg 
              animat = { Animat(dashOffset, dashArray) } 
              dashOffset = {dashOffset}
              barColor = {barColor}
              trackColor = {trackColor}
              dashArray = {dashArray}
              sizing = {options.svg}
              transformCircle = {options.transform}
              strokeWidth = {options.circle_width}
            >
              <circle 
                cx={options.radius} 
                cy={options.radius} 
                r={options.radius}>
              </circle>
              <circle 
                cx={options.radius} 
                cy={options.radius} 
                r={options.radius}>
              </circle>
            </Svg>
          </Percent>
          <Number 
            top = {options.number_top}
            left = {options.number_left}
            h3 = {options.number_h3}
            span = {options.number_span}
          >
            <h3>{rating}<span>%</span></h3>
          </Number>
        </Box>
        <Text sizing = {options.text_width}>User Score</Text>
      </Wrapper>
    );
};

export default Circular;