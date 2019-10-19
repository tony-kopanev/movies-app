import React from 'react';
import PropTypes from 'prop-types';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './Auth.scss';

const Auth = ({ email, password, mode, onSubmitHandler, onChangeHandler, switchModeHandler }) => {

    return (
        <div className="Auth">
            <form onSubmit = { onSubmitHandler }>
              <h2>{ mode === 'signup' ? 'Sign Up' : 'Sign In' }</h2>

              <Input 
                placeholder= 'Email'
                name = 'email'
                value= {email}
                onChangeHandler = { onChangeHandler }
              />

              <Input
                type="password"
                name = 'password'
                placeholder= 'Password'
                value= {password}
                onChangeHandler = { onChangeHandler }
              />

              <Button type='submit'>{ mode === 'signup' ? 'Sign Up' : 'Sign In' }</Button>

              <span onClick = { switchModeHandler }>Switch to { mode === 'signin' ? 'Sign Up' : 'Sign In' }</span>
            </form>
        </div>
    );
};

Auth.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
  switchModeHandler: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired
}

export default Auth;