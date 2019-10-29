import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'

import Toolbar from './components/Toolbar/Toolbar';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';
import { fetchMovies } from './store/actions/movieActions';
import { authenticateUser, switchAuthMode, authenticate as autoAuthUser, logoutUser } from './store/actions/auth';
import Auth from './components/Auth/Auth';

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
    //isSubmitted: false
  }
  
  componentDidMount() {
    const { fetchMovies, autoAuthUser } = this.props;
    fetchMovies('Black');

    const idToken = localStorage.getItem('idToken');
    const localId = localStorage.getItem('localId');

    if(idToken && localId)
      autoAuthUser(idToken, localId)
      //console.log('[IS_AUTH]');
  }

  componentDidUpdate(prevProps, prevState) {
    const { idToken, history } = this.props;
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

  render() {
    const { searchField, email, password } = this.state;
    const { 
      moviesList,
      mode,
      idToken,
      isFetching,
      isSubmitting,
      fetchMovies,
      switchAuthMode,
      logoutUser
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
    idToken: state.auth.idToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: request => dispatch(fetchMovies(request)),
    authenticateUser: (mode, email, password) => dispatch(authenticateUser(mode, email, password)),
    switchAuthMode: mode => dispatch(switchAuthMode(mode)),
    autoAuthUser: (idToken, localId) => dispatch(autoAuthUser(idToken, localId)),
    logoutUser: () => dispatch(logoutUser())
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
