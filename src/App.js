import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'

import Toolbar from './components/Toolbar/Toolbar';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';
import { fetchMovies } from './store/actions/movieActions';
import {
  authenticateUser,
  switchAuthMode,
  authenticate as autoAuthUser,
  logoutUser,
  setUserMovies,
} from './store/actions/auth';
import Auth from './components/Auth/Auth';
import MoviesList from './components/MoviesList/MoviesList';
import FullMovies from './components/FullMovies/FullMovies';

import './App.scss';

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
    userMovies: null
  }
  
  componentDidMount() {
    const { fetchMovies, autoAuthUser, setUserMovies } = this.props;
    fetchMovies('Black');

    const idToken = localStorage.getItem('idToken');
    const localId = localStorage.getItem('localId');

    if(idToken && localId) {
      autoAuthUser(idToken, localId);
      setUserMovies(localId);
    }
  }

  componentDidUpdate(prevProps) {
    const { idToken, history, localId, setUserMovies } = this.props;
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

      setUserMovies(localId);
      history.push('/');
    }
  }

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
    const { mode } = this.props;

    if (email.value === '' || password.value === '' || email.error || password.error) return;

    const { authenticateUser } = this.props;

    authenticateUser(mode, email.value, password.value)

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

  addMoviesToList = title => {
    const {localId} = this.props;

    const baseUrl = 'https://movies-app-a8b7e.firebaseio.com/';

    fetch(baseUrl + 'movies.json')
      .then(res => res.json())
      .then(data => {
        console.log('[data-get]', data);

        if(!data) {
          const options = {
            method: 'POST',
            body: JSON.stringify({
              localId,
              list: [title]
            })
          };

          fetch(baseUrl + 'movies.json', options)
          .then(res => res.json())
          .then(data => console.log('[data-post]', data))
          .catch(err => console.log('[err]', err));
        } else {
          let user, userKey;

          for (const key in data){
            user = data[key];

            if(localId === user.localId){
              user.list.push(title);
              userKey = key;
              break;
            }
          }

          if(userKey) {
            const options = {
              method: 'PUT',
              body: JSON.stringify(user.list)
            };
  
            fetch(baseUrl + `movies/${userKey}/list.json`, options)
              .then(res => res.json())
              .then(data => console.log('[data-put]', data))
              .catch(err => console.log('[err]', err))
          } else {
            const options = {
              method: 'POST',
              body: JSON.stringify({
                localId,
                list: [title]
              })
            };

            fetch(baseUrl + 'movies.json', options)
              .then(res => res.json())
              .then(data => console.log('[data-post-2]', data))
              .catch(err => console.log('[err]', err));
          }

          console.log('[data exist]', data);
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
      userMovies,
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
          // clicked = {this.fetchMoviesHandler}
          clicked = { () => fetchMovies(searchField) }
          logout = {logoutUser}
        />

        {/* <Movies 
          moviesList = {moviesList}
          isFetching = {isFetching}
        /> */}

         <Switch>
          <Route 
            path = "/list" 
            render = { props => (
              <MoviesList
                {...props}
                localId = {localId}
                list = {userMovies}
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
                // switchModeHandler = {this.switchModeHandler}
                switchModeHandler = {switchAuthMode}
                onBlurHandler = {this.onBlurHandler}
              />
          )} />

          <Route 
            path="/fullMovies/:movieID" 
            render = { props => (
              <FullMovies
                {...props}
                addMoviesToList = {this.addMoviesToList}
              />
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: request => dispatch(fetchMovies(request)),
    authenticateUser: (mode, email, password) => dispatch(authenticateUser(mode, email, password)),
    switchAuthMode: mode => dispatch(switchAuthMode(mode)),
    autoAuthUser: (idToken, localId) => dispatch(autoAuthUser(idToken, localId)),
    logoutUser: () => dispatch(logoutUser()),
    setUserMovies: localId => dispatch(setUserMovies(localId)),  
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
