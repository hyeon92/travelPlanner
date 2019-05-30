import { combineReducers } from 'redux';
import travel from './travel';
import user from './user';

export default combineReducers({
  travel,
  user
});
