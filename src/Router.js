import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./pages/admin/Home";
import Dashboard from "./pages/admin/Dashboard";
import Role from './pages/admin/Role';
import BuyRole from "./pages/client/BuyRole";

// import ProtectedRoute from './helpers/ProtectedRoute'

export default function Routing() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/:guildId/role">
          <Role />
        </Route>
        <Route path="/buyrole/guilds/:guildId/members/:userId">
          <BuyRole />
        </Route>
      </Switch>
    </Router>
  );
}
