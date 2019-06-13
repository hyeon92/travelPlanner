import { combineReducers } from 'redux';
import travel from './travel';
import user from './user';
import area from './area';

export default combineReducers({
  travel,
  user,
  area
});
