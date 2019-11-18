import styled from 'styled-components';
import rgba from '@bit/styled-components.polished.color.rgba';


const MovieContent = styled.div `
  display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .overviewWrapper{
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;

      p{
        flex: 0 0 45%;
        padding: 15px;
        background-color: ${rgba('black', .35)};
        border-radius: 5px;
        height: 100%;
        line-height: 1.5rem;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, sans-serif;
        font-size: .9rem;
      }
    }

  .ImageWrapper { flex: 1 0 45%; }

  .ImageWrapper{
    margin-right: 20px;

    img{
      width: 100%;
    }
  }


`;

export default MovieContent;