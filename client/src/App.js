import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import CreateGame from "./components/CreateGame";
import DetailsCard from "./components/DetailsCard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home/:id" render={({ match }) => <DetailsCard id={match.params.id} />} />
          <Route path="/home" component={Home} />
          <Route path="/createGame" component={CreateGame} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
