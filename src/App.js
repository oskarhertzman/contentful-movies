import React, {useState} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Movies from './views/Movies/Movies';
import Shows from './views/Shows/Shows';

function App() {

  return (
    <div className="App">
      <Router>
        <Route path="/movies" component={Movies} />
        <Route path="/shows" component={Shows} />
      </Router>
    </div>
  );
}

export default App;
