import {Link} from 'react-router-dom'
import './Home.css'

export default function Home() {
    return (
        <div className="home">
            <h1>Kickball manager</h1>
            <Link to="/teams">See all the teams</Link>
            <Link to="/players">See all the players</Link>
        </div>
    )
}
