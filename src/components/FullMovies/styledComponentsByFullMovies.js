import styled from 'styled-components';

export const Wrapper = styled.div `
  padding: 30px;
  padding-top: calc(92px + 30px);
`;

export const HeaderWrapper = styled(Wrapper) `
  background-image: radial-gradient(circle at 20% 50%, rgba(19.61%, 7.84%, 7.84%, 0.98) 0%, rgba(27.45%, 13.73%, 13.73%, 0.88) 100%);
  min-height: 100%;
  height: 200px;
  max-width: 1920px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageWrapper = styled.div `
  flex: 1 0 45%;
  margin-right: 20%;

  img { width: 100% }
`;