import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import TeamList from './views/teamList/TeamList'
import TeamDetail from './views/teamDetail/TeamDetail'
import PlayerList from './views/playerList/PlayerList'
import CreateTeam from './components/teams/CreateTeam'
import UpdateTeam from './components/teams/UpdateTeam'
import PlayerDetail from './views/playerDetail/PlayerDetail'
import Home from './views/home/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/teams/view" component={TeamList}/>
          <Route exact path="/teams/view/:id" component={TeamDetail} />
          <Route exact path="/teams/add" component={CreateTeam} />
          <Route exact path="/teams/update/:id" component={UpdateTeam} />
          <Route exact path="/players" component={PlayerList} />
          <Route exact path="/players/:id" component={PlayerDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
