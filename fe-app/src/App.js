import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";

import './App.css';
import Header from "./Header"
import Teams from "./Teams";
import Team from "./Team";
import Players from "./Players";
import Home from "./Home";
import Player from "./Player"


function App() {
  return (
    <div className="content">
      <Router>
        <Header />
        <main>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/players">
              <Players />
            </Route>
            <Route path="/teams">
              <Teams />
            </Route>
            <Route path="/team/:teamName">
              <Team />
            </Route>
            <Route path="/player/:playerName">
              <Player />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
