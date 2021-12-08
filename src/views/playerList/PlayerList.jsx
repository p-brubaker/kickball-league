import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {getPlayers} from '../../services/players'

export default function PlayerList({teamID}) {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        const get = async () => {
            const allPlayers = await getPlayers()
            if (teamID) {
                setPlayers(allPlayers.filter(player =>{
                    return player.team_id === teamID
                }) 
                )
            } else setPlayers(allPlayers)
        }
        get()
    }, [teamID])

    return (
        <div className="players-container">
            <Link to="/">Back to home</Link>
            {players.length ? (
                players.map(player => (
                    <Link key={player.id} to={`players/${player.id}`}>{player.name}</Link>
                ))
            ) : <h1>Loading...</h1>}
        </div>
    )
}
