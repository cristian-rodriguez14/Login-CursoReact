import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Api from "./components/Api";
import AlertaState from "./context/alertas/alertaState";
import { useState } from "react";

function App() {
  const [check, setCheck] = useState(false);
  
  return (
    <AlertaState>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home check={check} setCheck={setCheck} />
          </Route>
          <Route exact path="/login">
            <Login check={check} setCheck={setCheck} />
          </Route>
          <Route exact path="/api">
            <Api check={check} setCheck={setCheck} />
          </Route>
          <Route exact path="/register">
            <Register check={check} setCheck={setCheck} />
          </Route>
        </Switch>
      </Router>
    </AlertaState>
  );
}

export default App;
