import React, {Component} from 'react';

import Toolbar from './components/Toolbar/Toolbar';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';
import './App.scss';

class App extends Component {

  state = {
    searchField: '',
    isFetching: false,
    moviesList: null,
    // isOpen: false
  }

  onChangeHandler = event => this.setState({ searchField: event.target.value });

  fetchMoviesHandler = () => {

    /*  
        backdrop_path: null
        overview: ""
        poster_path: null
        title: "De Vliegende Panters - Daar Vliegende Panters"
*/

    // turn on Spinner (loading...)
    this.setState((prevState, prevProps) => ({
        isFetching: !prevState.isFetching
    }));

    const baseURL = 'https://api.themoviedb.org/3/search/movie';
    const apiKey = '52eae72c07d6cd03afd7491a82451f7b';

    fetch(`${baseURL}?api_key=${apiKey}&language=en-US&query=${this.state.searchField}&page=1&include_adult=false`)
      .then(res => res.json())
      .then(movies => {
        console.log('[movies.results]', movies.results);
        this.setState({
          moviesList: movies.results
        });
      })
      // turn off Spinner (loading...)
      .then(() => this.setState(prevState => ({
        isFetching: !prevState.isFetching
      })))
      .catch(err => console.log('[err]', err));

    // https://api.themoviedb.org/3/search/movie?api_key=52eae72c07d6cd03afd7491a82451f7b&language=en-US&query=Avengers&page=1&include_adult=false
  };

  
  render() {
    const { searchField, isFetching, moviesList } = this.state;
    
    return (
      <div className="App">
        <Toolbar 
          search = {searchField}
          isFetching = {isFetching} 
          changed = {this.onChangeHandler}
          clicked = {this.fetchMoviesHandler}
        />
  
        <Movies 
          moviesList = {moviesList}
          isFetching = {isFetching}
        />
        
         <Footer />
      </div>
    );
  };
}
  
export default App;
