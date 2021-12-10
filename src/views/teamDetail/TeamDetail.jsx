import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getTeamById } from '../../services/teams'
import PlayerList from '../playerList/PlayerList'

export default function TeamDetail() {
    const { id } = useParams()
    const [team, setTeam] = useState()

    useEffect(() => {
        getTeamById(id).then(res => setTeam(res))
    }, [id])

    return team ? (
        <div className="team-detail">
            <p>{team.name}</p>
            <p>City: {team.city}</p>
            <p>State: {team.state}</p>
            <PlayerList teamPlayers={team.players} />
        </div>
    ) : <p>Loading...</p>
}
