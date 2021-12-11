import { useState } from 'react'
import { addTeam } from '../../services/teams'
import { Link } from 'react-router-dom'

export default function CreateTeam() {
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [newTeam, setNewTeam] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await addTeam({ name, city, state })
        setNewTeam(response[0])
    }

    return newTeam ? (
        <div className='new-team'>
            <h1>Team added</h1>
            <p>{newTeam.name}</p>
            <p>{newTeam.city}</p>
            <p>{newTeam.state}</p>
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

            <button type='submit' aria-label='add a team'>
                Add
            </button>
        </form>
    )
}
