import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./pages/admin/Home";
import Server from "./pages/admin/Sever";
import Dashboard from "./pages/admin/Dashboard";
import Role from './pages/admin/Role';
import BuyRole from "./pages/client/BuyRole";

export default function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/account">
          <Dashboard />
        </Route>
        <Route path="/server/:id">
          <Server />
        </Route>
        <Route path="/role">
          <Role />
        </Route>
        <Route path="/buyrole">
          <BuyRole />
        </Route>
      </Switch>
    </Router>
  );
}
