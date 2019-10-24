import React from 'react';
import PropTypes from 'prop-types';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './Auth.scss';

const Auth = ({ 
  email, 
  password, 
  mode, 
  onSubmitHandler, 
  onChangeHandler, 
  switchModeHandler, 
  onBlurHandler,
  isSubmitted  
}) => {

    return (
        <div className="Auth">
            <form onSubmit = { onSubmitHandler }>
              <h2>{ mode === 'signup' ? 'Sign Up' : 'Sign In' }</h2>

              <label>
                <Input
                  classList = { email.error && 'Error' }
                  placeholder= 'Email'
                  name = 'email'
                  value= {email.value}
                  onChangeHandler = { onChangeHandler }
                  onBlurHandler = {onBlurHandler}
                />
                { email.error && <span className='ErrorMessage'>{email.message}</span> }
              </label>

              <label>
                <Input
                  classList = { password.error && 'Error' }
                  type="password"
                  name = 'password'
                  placeholder= 'Password'
                  value= {password.value}
                  onChangeHandler = { onChangeHandler }
                  onBlurHandler = {onBlurHandler}
                  />

                { password.error && <span className='ErrorMessage'>{password.message}</span> }
              </label>

              <Button 
                type='submit'
                classList = {
                  isSubmitted ? 'Disabled' 
                  : (email.error || password.error) && 'Alternative' 
                }
              >
                  {
                    isSubmitted
                    ? 'Submitting...' 
                    : mode === 'signup' ? 'Sign Up' : 'Sign In' 
                  }
              </Button>

              <span
                className = 'ModeToggler'
                onClick = { switchModeHandler }>
                Switch to { mode === 'signin' ? 'Sign Up' : 'Sign In' }
                </span>
            </form>
        </div>
    );
};

Auth.propTypes = {
  email: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
  switchModeHandler: PropTypes.func.isRequired,
  onBlurHandler: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  isSubmitted: PropTypes.bool.isRequired
}

export default Auth;