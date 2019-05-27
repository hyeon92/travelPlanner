import React from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import MainSide from 'page/side/MainSide';
import TravelSide from 'page/side/TravelSide';
import Main from 'page/Main';
import TravelListContainer from 'container/TravelListContainer';
import Login from 'page/Login';
import SignUp from 'page/SignUp';
import TravelDetail from 'page/TravelDetail';
import Travel from 'page/Travel';

function App() {
  return (
    <Layout>
      <Route path={'/'} component={MainSide} />
      <Route path={'/:list'} component={MainSide} />
      <Route path={'/:list/Detail'} component={TravelSide} />
      <Layout.Content
        style={{
          marginLeft: 200,
          padding: 24,
          background: '#F7ECEB',
          minHeight: 280
        }}
      >
        <Route exact path={'/'} component={Main} />
        <Route exact path={'/:list'} component={TravelListContainer} />
        <Route exact path={'/:list/:id'} component={Travel} />
        <Route exact path={'/:list/:id/Detail'} component={TravelDetail} />
      </Layout.Content>
    </Layout>
  );
}

export default App;
