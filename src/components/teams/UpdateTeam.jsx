import { useState, useEffect } from 'react'
import { updateTeam, getTeamById } from '../../services/teams'
import { Link, useParams } from 'react-router-dom'

export default function UpdateTeam() {
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [updatedTeam, setUpdatedTeam] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        getTeamById(id).then(teamData => {
            setName(teamData.name)
            setCity(teamData.city)
            setState(teamData.state)
        })
    }, [id])

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await updateTeam({id, name, city, state})
        setUpdatedTeam(response[0])
    }

    return updatedTeam ? (
        <div className="new-team">
            <h1>Team updated</h1>
            <p>{updatedTeam.name}</p>
            <p>{updatedTeam.city}</p>
            <p>{updatedTeam.state}</p>
            <Link to="/teams/view">Back to teams list</Link>
        </div>
    ) : (
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name:</label>
            <input
                id='name'
                name='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor='city'>City:</label>
            <input 
                id='city'
                name='city'
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)} 
            />

            <label htmlFor='state'>State:</label>
            <input 
                id='state'
                name='state'
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)} 
            />

            <button type='submit' aria-label='update a team'>
                Update
            </button>
        </form>
    )
}
