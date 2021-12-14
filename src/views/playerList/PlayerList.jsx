import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {deletePlayerById, getPlayers, addPlayer} from '../../services/players'
import './PlayerList.css'

export default function PlayerList({ teamID = null }) {
    const [players, setPlayers] = useState([])
    const [deleted, setDeleted] = useState([])

    useEffect(() => {
        let mounted = true
        async function get() {
            const allPlayers = await getPlayers()
            if (mounted && teamID) {
                setPlayers(allPlayers.filter(player => {
                    return player.team_id === teamID
                })) 
            } else if (mounted) setPlayers(allPlayers)
        }
        get()
        return function cleanup() {
            mounted = false
        }
    }, [teamID, deleted])

    async function handleDelete(id) {
        const res = await deletePlayerById(id)
        setDeleted(prev => [...prev, {name: res[0].name, position: res[0].position, team_id: res[0].team_id}])
    }

    async function handleRestore(deletedPlayer) {
        await addPlayer(deletedPlayer)
        setDeleted(prev => [...prev.filter(player => player.name !== deletedPlayer.name)])
    }

    return (
        <div className="players-container">
            <h1>Players</h1>
            {players ? (
                <div className="players-list">
                {players.map(player => (
                    <div className="player" key={player.id}>
                        <Link to={`/players/view/${player.id}`}>{player.name}</Link>
                        <Link to={`/players/update/${player.id}`}>Update</Link>
                        <button aria-label="delete-player" onClick={() => handleDelete(player.id)}>DELETE</button>
                    </div>
                ))}
                {deleted.map(deletedPlayer => (
                    <div key={deletedPlayer.name} className="deleted-player">
                        <p style={{textDecoration: 'line-through'}}>{deletedPlayer.name}</p>
                        <button onClick={() => handleRestore(deletedPlayer)}>Restore</button>
                    </div>
                ))}
                </div>
            ) : <h1>Loading...</h1>}
        </div>
    )
}
