import { authenticate } from './auth';
import { AUTHENTICATE_USER } from '../actionsTypes';

describe('actions/auth', () => {
  it.only('should authenticate user if everything is passed', () => {
    expect(authenticate('idToken', 'localId')).toEqual({
      type: AUTHENTICATE_USER,
      idToken: 'idToken',
      localId: 'localId'
    });
  });
});