import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Toolbar from './components/Toolbar/Toolbar';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';
import { fetchMovies } from './store/actions/movieActions';

import './App.scss';


class App extends PureComponent {
  state = {
    searchField: '',
  }
  
  componentDidMount() {
    const { fetchMovies } = this.props;
    fetchMovies('Black');
  }

  onChangeHandler = event => this.setState({ searchField: event.target.value });
  
  render() {
    const { searchField } = this.state;
    const { isFetching, moviesList, fetchMovies } = this.props;
    
    return (
      <div className="App">
        <Toolbar 
          search = {searchField}
          isFetching = {isFetching} 
          changed = {this.onChangeHandler}
          // clicked = {this.fetchMoviesHandler}
          clicked = { () => fetchMovies(searchField) }
        />

        <Movies 
          moviesList = {moviesList}
          isFetching = {isFetching}
        />
         {/* <Switch>
          <Route path='/movies' component = {Spinner} />
          <Route path='/contacts' render = {() => <h2>Our Contacts</h2>} />
          
          <Route
            path='/' exact
            render = {props =>
              ( <Movies 
                  {...props}
                  moviesList = {moviesList}
                  isFetching = {isFetching}
                />
              )} 
          />
          <Redirect to='/' />
        </Switch> */}
         <Footer />
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    sayHello: state.movies.sayHello, // this.props.sayHello
    moviesList: state.movies.moviesList,
    isFetching: state.movies.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: request => dispatch(fetchMovies(request)),
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(App);
