import { getTeams } from '../../services/teams'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './TeamList.css'

export default function TeamList() {
    const [teams, setTeams] = useState([])

    useEffect(() => {
        async function get() {
            const teams = await getTeams()
            setTeams(teams)
        }
        get()
    }, [])

    return (
        <div className="teams-container">
            <h1>Teams</h1>
            {teams ? (
                teams.map(team => <Link key={team.id} to={`teams/${team.id}`}>{team.name}</Link>)
            ) : <p>Loading...</p>}
        </div>
    )
}
