import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import LoginContainer from 'container/LoginContainer';
import SignUpContainer from 'container/SignUpContainer';
import TravelListContainer from 'container/TravelListContainer';
import TravelContainer from 'container/TravelContainer';
import TravelDetailContainer from 'container/TravelDetailContainer';

function App() {
  return (
    <Fragment>
      <Route exact path={'/'} component={LoginContainer} />
      <Route exact path={'/SignUp'} component={SignUpContainer} />
      <Route exact path={'/MyList'} component={TravelListContainer} />
      <Route exact path={'/:list/:id'} component={TravelContainer} />
      <Route
        exact
        path={'/MyList/:id/Detail'}
        component={TravelDetailContainer}
      />
    </Fragment>
  );
}

export default App;
