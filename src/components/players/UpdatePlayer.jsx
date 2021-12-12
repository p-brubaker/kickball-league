import { useState, useEffect } from 'react'
import { updatePlayer, getPlayerById } from '../../services/players'
import { Link, useParams } from 'react-router-dom'
import { getTeams } from '../../services/teams'
import { getByKey } from '../../utils/helpers'

export default function UpdatePlayer() {
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [teamID, setTeamID] = useState('')
    const [updatedPlayer, setUpdatedPlayer] = useState(null) 
    const [teams, setTeams] = useState([])
    const [selectedTeam, setSelectedTeam] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        getPlayerById(id).then(playerData => {
            setName(playerData.name)
            setPosition(playerData.position)
            setTeamID(playerData.team_id)
        })
    }, [id])

    useEffect(() => {
        getTeams().then(teamsData => {
                setTeams(teamsData)
                const team = getByKey({key: 'id', value: teamID, arr: teamsData})
                setSelectedTeam(team)
            })
    }, [teamID])

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await updatePlayer({ id, name, position, team_id: selectedTeam})
        response[0].team = getByKey({key: 'id', value: +selectedTeam, arr: teams}).name
        setUpdatedPlayer(response[0])
    }

    return updatedPlayer ? (
        <div className="new-player">
            <h1>Player updated</h1>
            <p>Name:{updatedPlayer.name}</p>
            <p>Position:{updatedPlayer.position}</p>
            <p>Team:{` ${updatedPlayer.team}`}</p>
            <Link to={`/teams/view/${teamID}`}>Back to team</Link>
            <Link to={`/players/view/`}>Go to players</Link>
        </div>
    ) : selectedTeam ? (
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

            <label htmlFor="team">Team</label>
            <select value={selectedTeam.id} onChange={(e) => setSelectedTeam(e.target.value)}>
                {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                ))}
            </select>

            <button type="submit" aria-label="update a player">
                Update
            </button>

        </form>
    ) : <p>Loading...</p>
}
