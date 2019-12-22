import React, { Component } from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';

import MoviesLisyStyled from './MoviesLisyStyled'

import { getMovieData } from '../../store/actions/movieListAction';

class MoviesList extends Component {

  // componentDidMount() {
  //   const { userMovies } = this.props;
  //   getMovieData(userMovies);
  // };

  shouldComponentUpdate(nextProps){
    const { userMovies, listData } = this.props;
    return userMovies !== nextProps.userMovies || listData !== nextProps.listData;
  };

  componentDidUpdate(prevProps) {
    const { userMovies, getMovieData } = this.props;

    if(!prevProps.userMovies && Array.isArray(userMovies)) {
      getMovieData(userMovies);
    }
  }

  render(){
    const { listData } = this.props;
    
    if(!listData.length) return null;
    
    return (
      <MoviesLisyStyled dataList = { listData } />
      );
  };
};


// const MoviesList = ({localId, list}) => {
//   return (
//     <div className="MoviesList">
//         <div className="List">
//           <h3>LocalId: <span>{localId}</span></h3>
//           <strong>MoviesList:</strong>
          
//           <ol>
//             { list && list.map((movie, i) => <li key={i}>{movie}</li> )}
//           </ol>
//         </div>
//     </div>
// );
// }

// MoviesList.propTypes = {
//     localId: PropTypes.string,
//     list: PropTypes.arrayOf(PropTypes.string)
// };

const mapStateToProps = state => {
  return {
    listData: state.movieList.listData,
    userMovies: state.auth.userMovies,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovieData: id => dispatch(getMovieData(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);