import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import Movies from './views/Movies/Movies';
import Shows from './views/Shows/Shows';
import Details from './views/Details/Details';
import Create from './views/Create/Create';

function App() {

  return (
    <>
      <Router>
        <Route path="/movies" component={Movies} />
        <Route path="/shows" component={Shows} />
        <Route path="/details/:id" component={Details} />
        <Route path="/create" component={Create} />
      </Router>
    </>
  );
}

export default withRouter(App);
