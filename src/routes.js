import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './Components/App';


import MovieContainer from './Components/Movie/MovieContainer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MovieContainer}/>
    <Route path="Movies" component={MovieContainer} />
  </Route>
);
