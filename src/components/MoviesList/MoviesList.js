import React from 'react';
import PropTypes from 'prop-types';

import './MoviesList.scss';

const MoviesList = ({localId, list}) => {
  return (
    <div className="MoviesList">
        <div className="List">
          <h3>LocalId: <span>{localId}</span></h3>
          <strong>MoviesList:</strong>
          
          <ol>
            { list && list.map((movie, i) => <li key={i}>{movie}</li> )}
          </ol>
        </div>
    </div>
);
}

MoviesList.propTypes = {
    localId: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.string)
};

export default MoviesList;