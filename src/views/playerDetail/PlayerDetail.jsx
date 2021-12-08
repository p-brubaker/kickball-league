import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPlayerById } from '../../services/players'
import { getTeamById } from '../../services/teams'

export default function PlayerDetail() {
    const { id } = useParams()
    const [player, setPlayer] = useState(null)

    useEffect(() => {
        const get = async () => {
            const player = await getPlayerById(id)
            const team = await getTeamById(player.team_id)
            player.team = team.name
            setPlayer(player)
        }
        get()
    },[id])

    return (
        player ? (
        <div className="player-detail">
            <p>Name:{` ${player.name}`}</p>
            <p>Position:{` ${player.position}`}</p>
            <p>Team:{` ${player.team}`}</p>

        </div>
    ) : <p>Loading...</p>
    )
}
