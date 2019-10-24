import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'

import Toolbar from './components/Toolbar/Toolbar';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';
import { fetchMovies } from './store/actions/movieActions';
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
    mode: 'signup',
    isSubmitted: false
  }
  
  componentDidMount() {
    const { fetchMovies } = this.props;
    fetchMovies('Black');
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

    const { email, password, /*isSubmitted,*/ mode } = this.state;

    if (email.value === '' || password.value === '' || email.error || password.error) return;

    this.setState({ isSubmitted: true });

    //const { history } = this.props;

    // let baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
      
    // if (mode === 'signin') 
    //   baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

    const baseUrl = mode === 'signup'
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

    const apiKey = 'AIzaSyBdQshjgR0sZTEEO8qZiJP33dlj6LU-VsE';
    const options = {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        returnSecureToken: true
      })};

    fetch(baseUrl + apiKey, options)
      .then(res => res.json())
      .then(result => {
        console.log('[result]', result);
        this.setState({
          email: {
            ...email,
            value: '',
          },
          password: {
            ...password,
            value: '',
          },
          isSubmitted: false
        });
      })
      //.then(() => history.push('/'))
      .catch(err => {
        console.log('[err]', err)
        this.setState({ isSubmitted: false });
      })

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

  switchModeHandler = () => {
    this.setState(prevState => ({
      mode: prevState.mode === 'signup' ? 'signin' : 'signup'
    }))
  };

  render() {
    const { searchField, email, password, mode, isSubmitted } = this.state;
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
                isSubmitted = {isSubmitted}
                onChangeHandler = {this.onChangeHandler}
                onSubmitHandler = {this.onSubmitHandler}
                switchModeHandler = {this.switchModeHandler}
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
         <Footer />
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    moviesList: state.movies.moviesList,
    isFetching: state.movies.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: request => dispatch(fetchMovies(request)),
  };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
