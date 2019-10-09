
import { SAY_HELLO } from './actionsTypes';

export const actionSayHello = status => {
  return { 
    type: SAY_HELLO, 
    status 
  };
};