import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Home";
import { LoginPage } from "./standard/step1/Login";
import { LoginXStatePage } from "./xstate/step1/LoginXState";

function App() {
  return (
    <Router>
      <div>
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/step1/standard" component={LoginPage} />
            <Route exact path="/step1/xstate" component={LoginXStatePage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
