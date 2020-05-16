import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PrivateRoute from "./components/privateroute";
import BubblePage from "./components/BubblePage";

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <header>
        <div className="container">
          <Link className="brand-name" to="/">
            Bubbles
          </Link>
          <ul className="nav-list">
            <li>
              <Link className="nav-link" to="/bubble-page">
                bubble page
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/bubble-page" component={BubblePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
