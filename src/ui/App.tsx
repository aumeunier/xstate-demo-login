import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Home";
import { Login1 } from "./step1-basics/Login1";
import { LoginXState1 } from "./step1-basics/LoginXState1";
import { LoginV2 } from "./step2-context/Login2";
import { LoginXStateV2 } from "./step2-context/LoginXState2";
import { AuthPage } from "./step3/AuthPage";

function App() {
  return (
    <Router>
      <div>
        <main className="bg-indigo-200 w-screen h-screen">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/step1/standard" component={Login1} />
            <Route exact path="/step1/xstate" component={LoginXState1} />
            <Route exact path="/step2/standard" component={LoginV2} />
            <Route exact path="/step2/xstate" component={LoginXStateV2} />
            <Route exact path="/step3/xstate" component={AuthPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
