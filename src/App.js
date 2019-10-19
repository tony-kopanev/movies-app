import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'

import Toolbar from './components/Toolbar/Toolbar';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';
import { fetchMovies } from './store/actions/movieActions';
import Auth from './components/Auth/Auth';

import './App.scss';


class App extends PureComponent {
  state = {
    searchField: '',
    email: '',
    password: '',
    mode: 'signup'
  }
  
  componentDidMount() {
    const { fetchMovies } = this.props;
    fetchMovies('Black');
  }

  onChangeHandler = event => {
    console.log('[event.target.name]', event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  }
  
  onSubmitHandler = () => {
    console.log('%c[SUBMITTED]', 'color: teel; font-style: italic;');
  }

  switchModeHandler = () => {
    this.setState(prevState => ({
      mode: prevState.mode === 'signup' ? 'signin' : 'signup'
    }))
  }

  render() {
    const { searchField, email, password, mode } = this.state;
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

        {/* <Movies 
          moviesList = {moviesList}
          isFetching = {isFetching}
        /> */}

         <Switch>
          <Route 
            path="/auth" 
            render = { props => (
              <Auth
                {...props}
                email = {email}
                password = {password}
                mode = {mode}
                onChangeHandler = {this.onChangeHandler}
                onSubmitHandler = {this.onSubmitHandler}
                switchModeHandler = {this.switchModeHandler}
              />
          )} />

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
        </Switch>
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
