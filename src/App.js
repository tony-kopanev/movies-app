import React, { PureComponent } from 'react';
//import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import Toolbar from './components/Toolbar/Toolbar';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';
import { connect } from 'react-redux';
import { actionSayHello } from './store/movies/action';

import AppContext from './context/appContext';
import './App.scss';


class App extends PureComponent {
  state = {
    searchField: '',
    isFetching: false,
    moviesList: null,
    // isOpen: false
  }

  // static getDerivedStateFromProps(props, state){
  //   console.log('[DerivedState-propps]', props);
  //   console.log('[DerivedState-state]', state);
  //   console.log('[App] %cDerivedState', 'color: orange;');
  //   return null;
  // }

  // componentDidCatch(error, info) {

  // }

  // componentWillUnmount() {
  // //   // console.log('[nextProps]', nextProps);
  // // }
  
  componentDidMount() {
    //console.log('[this.props]', this.props);
    //console.log('[App] %ccomponentDidMount', 'color: orange;');

    this.props.updateSayHello(true);

    this.setState((prevState, prevProps) => ({
      isFetching: !prevState.isFetching
    }));

    const baseURL = 'https://api.themoviedb.org/3/search/movie';
    const apiKey = '52eae72c07d6cd03afd7491a82451f7b';
    //const lang = 'ru-RU';
    //const lang = 'uk-UA';
    const lang = 'en-US';

    //fetch(`${baseURL}?api_key=${apiKey}&language=en-US&query=${this.state.searchField}&page=1&include_adult=false`)
    fetch(`${baseURL}?api_key=${apiKey}&language=${lang}&query=Black&page=1&include_adult=false`)
      .then(res => res.json())
      .then(movies => {
        this.setState({
          moviesList: movies.results.slice(0, 4)
        });
      })
      // turn off Spinner (loading...)
      .then(() => {
        this.setState(prevState => ({
          isFetching: !prevState.isFetching
        }));

        // setTimeout(() => {
        //   this.setState({ moviesList: null })
        // },4000);
      })
      .catch(err => console.log('[err]', err));
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   // console.log('[nextProps]', nextProps);
  //   // console.log('[nextState]', nextState);
  //   console.log('[App] %cshouldComponentUpdate', 'color: orange;');
  //   return true;
  // }

  // getSnapshotBeforeUpdate(props, state){
  //   // console.log('[nextProps]', nextProps);
  //   // console.log('[nextState]', nextState);
  //   console.log('[App] %cgetSnapshotBeforeUpdate', 'color: orange;');
  //   return 'This is Snapshot';
  // }

  // componentDidUpdate(props, state, snapshot) {
  //   console.log('[App] %ccomponentDidUpdate', 'color: orange;');
  //   console.log('[snapshot]', snapshot);
  //   console.log('');
  // }

  onChangeHandler = event => this.setState({ searchField: event.target.value });

  fetchMoviesHandler = () => {

    // turn on Spinner (loading...)
    // this.setState((prevState, prevProps) => ({
    //     isFetching: !prevState.isFetching
    // }));

    // const baseURL = 'https://api.themoviedb.org/3/search/movie';
    // const apiKey = '52eae72c07d6cd03afd7491a82451f7b';

    // fetch(`${baseURL}?api_key=${apiKey}&language=en-US&query=${this.state.searchField}&page=1&include_adult=false`)
    //   .then(res => res.json())
    //   .then(movies => {
    //     console.log('[movies.results]', movies.results);
    //     this.setState({
    //       moviesList: movies.results
    //     });
    //   })
    //   // turn off Spinner (loading...)
    //   .then(() => this.setState(prevState => ({
    //     isFetching: !prevState.isFetching
    //   })))
    //   .catch(err => console.log('[err]', err));

    // https://api.themoviedb.org/3/search/movie?api_key=52eae72c07d6cd03afd7491a82451f7b&language=en-US&query=Avengers&page=1&include_adult=false
  };

  
  render() {
    //console.log('[App] %crender', 'color: orange;');
    console.log('[this.props.sayHello]', this.props.sayHello);
    const { searchField, isFetching, moviesList } = this.state;
    
    return (
      <div className="App">
        <AppContext.Provider value= {{
          searchField,
          moviesList,
          isFetching
        }} >
          <Toolbar 
            //search = {searchField}
            isFetching = {isFetching} 
            changed = {this.onChangeHandler}
            clicked = {this.fetchMoviesHandler}
          />
        </AppContext.Provider>

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
    sayHello: state.movies.sayHello // this.props.sayHello
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSayHello: sts => dispatch(actionSayHello(sts)),
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(App);
