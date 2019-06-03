import { createStore, applyMiddleware } from 'redux';
import modules from 'store/module';

import ReduxThunk from 'redux-thunk';

const configure = () => {
  const store = createStore(modules, applyMiddleware(ReduxThunk));
  return store;
};

export default configure;
