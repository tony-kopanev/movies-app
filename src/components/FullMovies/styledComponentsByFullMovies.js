import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap');
 
 body {
   padding: 0;
   margin: 0;
   font-family: 'Source Sans Pro', Arial, sans-serif;
 }
`;

export const Wrapper = styled.div `
  padding: 30px 75px;
  padding-top: calc(92px + 30px);
`;

export const HeaderWrapper = styled(Wrapper) `
  background: 
    radial-gradient(circle at 20% 50%, rgba(19.61%, 7.84%, 7.84%, 0.98) 0%, rgba(27.45%, 13.73%, 13.73%, 0.88) 100%),
    url(${p => p.bgImg}) no-repeat 50% 50%;
  background-size: cover;
  height: auto;
  max-width: 1920px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

export const ImageWrapper = styled.div `
  flex: 1 0 30%;
  margin-right: 3%;
  max-width: 300px;

  img { width: 100% }
`;

export const TittleWrapper = styled.div `
  flex: 1 0 60%;
  max-width: 1000px;
  min-height: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;

  h1, .overview h2 {
    margin-bottom: 15px;
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

export const FeaturedCrew = styled.div `
  display: flex;
  width: 100%;
  max-width: 350px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  align-self: flex-start;

  h3, span { font-size: 1rem; }
`;
