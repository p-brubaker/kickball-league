import { useState } from 'react'
import { addPlayer } from '../../services/players'
import { Link, useParams } from 'react-router-dom'

export default function CreatePlayer() {
    const { teamID } = useParams()
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [newPlayer, setNewPlayer] = useState(null)
    
    async function handleSubmit(e) {
        e.preventDefault()
        const response = await addPlayer({ name, position, team_id: teamID})
        setNewPlayer(response[0])
    }

    return newPlayer ? (
        <div className="new-player">
            <h1>Player added</h1>
            <p>{newPlayer.name}</p>
            <p>{newPlayer.position}</p>
            <Link to={`/teams/view/${teamID}`}>Back to team</Link>
        </div>
    ) : (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="position">Position:</label>
            <input
                id="position"
                name="position"
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />

            <button type="submit" aria-label="add a player">
                Add
            </button>
        </form>
    )
}
