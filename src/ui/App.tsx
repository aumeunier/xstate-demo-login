import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Home";
import { LoginPage } from "./standard/step1/Login";
import { AuthPage } from "./xstate/final/AuthPage";
import { LoginXStatePage } from "./xstate/step1/LoginXState.step1";
import { LoginXStateV2 } from "./xstate/step2/LoginXState.step2";

function App() {
  return (
    <Router>
      <div>
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/step1/standard" component={LoginPage} />
            <Route exact path="/step1/xstate" component={LoginXStatePage} />
            <Route exact path="/step2/xstate" component={LoginXStateV2} />
            <Route exact path="/final/xstate" component={AuthPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
