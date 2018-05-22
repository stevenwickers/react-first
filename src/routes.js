import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './Components/App';
import Home from './Components/Home/HomeContainer'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
  </Route>
);
