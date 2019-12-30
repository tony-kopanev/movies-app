import React, { PureComponent, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'

import Toolbar from './components/Toolbar/Toolbar';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';
import { fetchMovies, fetchByPopularity } from './store/actions/movieActions';
import {
  authenticateUser,
  switchAuthMode,
  authenticate as autoAuthUser,
  logoutUser,
  addUserMovies,
  recoveryUserMoviesList
} from './store/actions/auth';
import Auth from './components/Auth/Auth';
import MoviesList from './components/MoviesList/MoviesList';
import Spinner from './components/UI/Spinner/Spinner';

import './App.scss';

const AsyncFullMovies = lazy(() => import('./components/FullMovies/FullMovies'));

class App extends PureComponent {
  state = {
    searchField: '',
    email: {
      value: '',
      error: false,
      message: 'The email address is incorrect.'
    },
    password: {
      value: '',
      error: false,
      message: 'The password should be minimum 6 characters length.'
    },
  }
  
  componentDidMount() {
    const { fetchByPopularity, autoAuthUser, recoveryUserMoviesList } = this.props;
    fetchByPopularity();

    const idToken = localStorage.getItem('idToken');
    const localId = localStorage.getItem('localId');
    const keyDb = localStorage.getItem('keyDb');
    
    if(idToken && localId && keyDb) {
      autoAuthUser(idToken, localId, keyDb);
      recoveryUserMoviesList(keyDb);
    }
  };

  componentDidUpdate(prevProps) {
    const { idToken } = this.props;
    const { email, password } = this.state;

    if(prevProps.idToken !== idToken){
      this.setState({
        email: {
          ...email,
          value: ''
        },
        password: {
          ...password,
          value: ''
        }
      })
    }
  };

  onChangeHandler = event => {
    const {name, value} = event.target;

    switch(name){
      case 'email':
      case 'password':
        this.setState({
          [name]: {
            ...this.state[name],
            value
          }
        }); break;
      default:
        this.setState({ [name]: value }); 
        break;
    }    
  }
  
  onSubmitHandler = event => {
    event.preventDefault();

    const { email, password } = this.state;
    const { mode, history } = this.props;

    if (email.value === '' || password.value === '' || email.error || password.error) return;

    const { authenticateUser } = this.props;

    authenticateUser(mode, email.value, password.value, history)

  };

  onBlurHandler = event => {
    
    const { name, value } = event.target;

    switch (name) {
      case 'email':
        // проверка на регулярные выражения
        if(/^[a-z0-9._-]+@[a-z0-9]+\.+[a-z]{2,3}/.test(value) || !value.length) {
          this.setState({
            [name]: {
              ...this.state[name],
              error: false
            }
          })
        } else {
          this.setState({
            [name]: {
              ...this.state[name],
              error: true
            }
          })
        } 
        break;

      case 'password':
        if(value.length < 6 && value.length) {
          this.setState({
            [name]: {
              ...this.state[name],
              error: true
            }
          })
        } else {
          this.setState({
            [name]: {
              ...this.state[name],
              error: false
            }
          })
        } 
        break;

      default: break;
    }
  };

  addMoviesToList = idMovie => {
    const {localId, keyDb, updateUserMovies} = this.props;
    const secret = 'yTCcnymnwnjnjD5dES6HtAlE4qbzIoAJK1zsD8HB';
    const baseUrl = `https://movies-app-a8b7e.firebaseio.com/movies/${keyDb}/.json?auth=${secret}`;

    const setDataUserMoviesList = (localId, list) => {
      const options = {
        method: 'PATCH',
        body: JSON.stringify({ list, localId })
      };

      fetch(baseUrl, options)
        .then(res => res.json())
        .then(data => console.log('[data_patch]', data))
        .catch(err => console.log('[err]', err))
    };


    fetch(baseUrl)
      .then(res => res.json())
      .then(data => {
        if(data.list){
          if(!data.list.includes(idMovie)){
            data.list.push({ id: idMovie, date: Date.now() });
            setDataUserMoviesList(localId, data.list);
            updateUserMovies(data.list)
          }
        } else {
          setDataUserMoviesList(localId, [{ id: idMovie, date: Date.now() }]);
          updateUserMovies([{ id: idMovie, date: Date.now() }]);
        }
      })
      .catch(err => console.log('[err]', err))
  };

  render() {
    const { searchField, email, password } = this.state;
    const { 
      moviesList,
      mode,
      localId,
      idToken,
      isFetching,
      isSubmitting,
      keyDb,
      history,
      fetchMovies,
      switchAuthMode,
      logoutUser,
    } = this.props;
    
    return (
      <div className="App">
        <Toolbar 
          search = {searchField}
          idToken = {idToken}
          isFetching = {isFetching} 
          changed = {this.onChangeHandler}
          clicked = { () => fetchMovies(searchField) }
          logout = {logoutUser}
        />

        <Switch>
          <Route 
            path = "/list" 
            render = { props => (
              <MoviesList
                {...props}
                localId = {localId}
                //list = {userMovies}
              />
          )} />

          <Route 
            path="/auth" 
            render = { props => (
              <Auth
                {...props}
                email = {email}
                password = {password}
                mode = {mode}
                isSubmitting = {isSubmitting}
                onChangeHandler = {this.onChangeHandler}
                onSubmitHandler = {this.onSubmitHandler}
                switchModeHandler = {switchAuthMode}
                onBlurHandler = {this.onBlurHandler}
                history = {history}
              />
          )} />

          <Route 
            path="/fullMovies/:movieID" 
            render = { props => (
              <Suspense fallback = { <Spinner /> }>
                <AsyncFullMovies 
                  {...props}
                  addMoviesToList = {this.addMoviesToList}
                  idToken = {idToken}
                />
              </Suspense>
          )} />

          <Route
            path='/' exact
            render = {props =>
              ( <Movies 
                  {...props}
                  moviesList = {moviesList}
                  isFetching = {isFetching}
                  idToken = {idToken}
                  addMoviesToList = {this.addMoviesToList}
                  keyDb = {keyDb}
                />
              )} 
          />
        </Switch>
         <Footer idToken = {idToken} />
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    moviesList: state.movies.moviesList,
    isFetching: state.movies.isFetching,
    isSubmitting: state.auth.isSubmitting,
    mode: state.auth.mode,
    idToken: state.auth.idToken,
    localId: state.auth.localId,
    userMovies: state.auth.userMovies,
    keyDb: state.auth.keyDb
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: request => dispatch(fetchMovies(request)),
    fetchByPopularity: () => dispatch(fetchByPopularity()),
    authenticateUser: (mode, email, password, history) => dispatch(authenticateUser(mode, email, password, history)),
    switchAuthMode: mode => dispatch(switchAuthMode(mode)),
    autoAuthUser: (idToken, localId, keyDb) => dispatch(autoAuthUser(idToken, localId, keyDb)),
    logoutUser: () => dispatch(logoutUser()),
    updateUserMovies: movies => dispatch(addUserMovies(movies)),
    recoveryUserMoviesList: keyDb => dispatch(recoveryUserMoviesList(keyDb))
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
