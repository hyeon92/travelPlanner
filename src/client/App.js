import React from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import TravelSide from 'container/TravelSideContainer';

import BasicSide from 'page/side/BasicSide';
import MainSide from 'page/side/MainSide';
import LoginContainer from 'container/LoginContainer';
import SignUpContainer from 'container/SignUpContainer';
import TravelListContainer from 'container/TravelListContainer';
import TravelContainer from 'container/TravelContainer';
import TravelDetailContainer from 'container/TravelDetailContainer';

function App() {
  return (
    <Layout>
      <Route exact path={'/'} component={BasicSide} />
      <Route exact path={'/SignUp'} component={BasicSide} />
      <Route path={'/MyList'} component={MainSide} />
      <Route path={'/:list/:id'} component={TravelSide} />
      <Layout.Content
        style={{
          marginLeft: 200,
          padding: 24,
          background: '#F7ECEB',
          minHeight: 1000
        }}
      >
        <Route exact path={'/'} component={LoginContainer} />
        <Route exact path={'/SignUp'} component={SignUpContainer} />
        <Route exact path={'/MyList'} component={TravelListContainer} />
        <Route exact path={'/:list/:id'} component={TravelContainer} />
        <Route
          exact
          path={'/MyList/:id/Detail'}
          component={TravelDetailContainer}
        />
      </Layout.Content>
    </Layout>
  );
}

export default App;
