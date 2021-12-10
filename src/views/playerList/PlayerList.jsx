import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {getPlayers} from '../../services/players'
import './PlayerList.css'

export default function PlayerList({teamPlayers}) {
    const [players, setPlayers] = useState(teamPlayers || [])

    useEffect(() => {
        async function get() {
            const allPlayers = await getPlayers()
            setPlayers(allPlayers)
        }
        if (!players.length) get()
    }, [players])

    return (
        <div className="players-container">
            <h1>Players</h1>
            {players.length ? (
                players.map(player => (
                    <Link key={player.id} to={`/players/${player.id}`}>{player.name}</Link>
                ))
            ) : <h1>Loading...</h1>}
        </div>
    )
}
