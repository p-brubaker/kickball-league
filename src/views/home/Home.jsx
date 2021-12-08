import {Link} from 'react-router-dom'

export default function Home() {
    return (
        <div className="home">
            <Link to="/teams">See all the teams</Link>
            <Link to="/players">See all the players</Link>
        </div>
    )
}
