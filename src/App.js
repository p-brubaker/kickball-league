import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import TeamList from './views/teamList/TeamList'
import TeamDetail from './views/teamDetail/TeamDetail'
import PlayerList from './views/playerList/PlayerList'
import PlayerDetail from './views/playerDetail/PlayerDetail'
import Home from './views/home/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/teams" component={TeamList}/>
          <Route exact path="/teams/:id" component={TeamDetail} />
          <Route exact path="/players" component={PlayerList} />
          <Route exact path="/players/:id" component={PlayerDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
