import styled from 'styled-components';
import rgba from '@bit/styled-components.polished.color.rgba';

const MovieItem = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  background-image: ${ p => p.backgroundParagraph };
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  color: white;
  margin-bottom: 30px;
  
  /* will-change: opacity;
  transition: filter 1s; */

  &:last-child { margin-bottom: 0; }
  
  &::before{
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute; 
    /* background-color: ${rgba('black', .5)}; */
    /* background-image: radial-gradient(circle at 20% 50%, rgba(19.61%, 7.84%, 7.84%, 0.98) 0%, rgba(27.45%, 13.73%, 13.73%, 0.88) 100%); */
    background-image: radial-gradient(circle at 20% 50%, 
      ${ p => p.backgroundBefore[0] } 0%,
      ${ p => p.backgroundBefore[1] } 100%);
  }

  > * {
    position: relative;
    z-index: 2;
  }


  h1{
    margin-bottom: 20px;
    text-shadow: 3px 3px 4px #000;
  }

  .LinkButton{
    border: 2px solid #fff;
    padding: 5px 25px;
    font-size: 1.2rem;
    color: #fff;
    background-color: transparent;
    cursor: pointer;
    transition: border-radius 200ms ease;
    text-align: center;
    text-decoration: none;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, sans-serif;

    &:hover { border-radius: 25px; }
  }
`;

export default MovieItem;