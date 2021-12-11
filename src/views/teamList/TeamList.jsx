import { getTeams, deleteTeamById, addTeam } from '../../services/teams'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './TeamList.css'

export default function TeamList() {
    const [teams, setTeams] = useState([])
    const [deleted, setDeleted] = useState([])

    useEffect(() => {
        async function get() {
            const teams = await getTeams()
            setTeams(teams)
        }
        get()
    }, [deleted])

    async function handleDelete(id) {
        const res = await deleteTeamById(id)
        setDeleted(prev => [...prev, {name: res[0].name, city: res[0].city, state: res[0].state }])
    }

    async function handleRestore(deletedTeam) {
        await addTeam(deletedTeam)
        setDeleted(prev => [...prev.filter(team => team.name !== deletedTeam.name)])
    }

    return (
        <div className="teams-container">
            <h1>Teams</h1>
            <Link to='/teams/add'>Add a team</Link>
            {teams ? (
                <div className="teams-list">
                {teams.map(team => (
                    <div className="team" key={team.id}>
                        <Link to={`/teams/view/${team.id}`}>{team.name}</Link>
                        <button onClick={() => handleDelete(team.id)}>DELETE</button>
                        <Link to={`/teams/update/${team.id}`}>Update</Link>
                    </div>
                ))}
                {deleted.map(deletedTeam => (
                    <div key={deletedTeam.name} className="deleted-team">
                        <p style={{textDecoration: 'line-through'}}>{deletedTeam.name}</p>
                        <button onClick={() => handleRestore(deletedTeam)}>Restore</button>    
                    </div>
                ))}
                </div>
            ) : <p>Loading...</p>}
        </div>
    )
}
