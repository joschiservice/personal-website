//Pages
import HomePage from "./pages/HomePage";

//Node Modules
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
          <Route path="/">
            <HomePage />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
