import { getTeams, deleteTeamById } from '../../services/teams'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './TeamList.css'

export default function TeamList() {
    const [teams, setTeams] = useState([])
    const [didDelete, setDidDelete] = useState(false)

    useEffect(() => {
        async function get() {
            const teams = await getTeams()
            setTeams(teams)
        }
        get()
    }, [didDelete])

    async function handleDelete(id) {
        await deleteTeamById(id)
        setDidDelete(true)
        setDidDelete(false)
    }

    return (
        <div className="teams-container">
            <h1>Teams</h1>
            <Link to='/teams/add'>Add a team</Link>
            {teams ? (
                teams.map(team => (
                <div className="team">
                    <Link key={team.id} to={`/teams/view/${team.id}`}>{team.name}</Link>
                    <button onClick={() => handleDelete(team.id)}>DELETE</button>
                </div>
                ))
            ) : <p>Loading...</p>}
        </div>
    )
}