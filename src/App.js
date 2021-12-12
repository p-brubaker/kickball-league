import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import TeamList from './views/teamList/TeamList'
import TeamDetail from './views/teamDetail/TeamDetail'
import PlayerList from './views/playerList/PlayerList'
import CreateTeam from './components/teams/CreateTeam'
import UpdateTeam from './components/teams/UpdateTeam'
import UpdatePlayer from './components/players/UpdatePlayer'
import PlayerDetail from './views/playerDetail/PlayerDetail'
import CreatePlayer from './components/players/CreatePlayer'
import Header from './layout/header/Header'
import Home from './views/home/Home'

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/teams/view" component={TeamList}/>
          <Route exact path="/teams/view/:id" component={TeamDetail} />
          <Route exact path="/teams/add" component={CreateTeam} />
          <Route exact path="/teams/update/:id" component={UpdateTeam} />
          <Route exact path="/players/view" component={PlayerList} />
          <Route exact path="/players/view/:id" component={PlayerDetail} />
          <Route exact path="/players/add/:teamID" component={CreatePlayer} />
          <Route exact path="/players/update/:id" component={UpdatePlayer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
