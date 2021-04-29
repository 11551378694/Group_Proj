import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
      <Router>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">CSCI2720 Group5</a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
              <a class="nav-link"><Link to="/">Home</Link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link"><Link to="/test">Test</Link></a>
              </li>
            </ul>
          </div>
        </div>
        
      </nav>
      <Switch>
          <Route exact path="/" component={Home} /> 
          <Route path="/test" component={Test} /> 
        </Switch>
      </Router>
    </div>
    )
  }
}

class Home extends React.Component {
  render() {
    return (
        <div>
          <h2>Home</h2>
        </div>
    );
  }
}

class Test extends React.Component {
  render() {
    return (
        <div>
          <h2>Test</h2>
        </div>
    );
  }
}

export default App;
