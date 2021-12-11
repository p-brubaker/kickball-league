import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getTeamById } from '../../services/teams'
import PlayerList from '../playerList/PlayerList'

export default function TeamDetail() {
    const { id } = useParams()
    const [team, setTeam] = useState(null)

    useEffect(() => {
        getTeamById(id).then(res => setTeam(res))
    }, [id])

    return team ? (
        <div className="team-detail">
            <Link to={`/teams/update/${id}`}>Update this team</Link>
            <p>{team.name}</p>
            <p>City: {team.city}</p>
            <p>State: {team.state}</p>
            <PlayerList teamPlayers={team.players} />
        </div>
    ) : <p>Loading...</p>
}
