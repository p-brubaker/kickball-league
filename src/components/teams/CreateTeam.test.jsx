import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import CreateTeam from './CreateTeam'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import userEvent from '@testing-library/user-event'

const mockTeam = {
    id: 10,
    created_at: '2021-12-12T05:34:30.551Z',
    name: 'Baguettes',
    city: 'Paris',
    state: 'France',
    players: []
}

const server = setupServer(
    rest.post('https://paozlutduarjgvzaiduh.supabase.co/rest/v1/teams', 
        (req, res, ctx) => {
            return res(ctx.json([mockTeam]))
        }
    )
)

beforeAll(() => {
    server.listen()
})

afterAll(() => {
    server.close()
})

it('should render create team form, then the created team', async () => {

    render(
        <MemoryRouter>
            <CreateTeam />
        </MemoryRouter>
    )

    const nameField = screen.getByLabelText(/Name:/)
    const cityField = screen.getByLabelText(/City:/)
    const stateField = screen.getByLabelText(/State:/)
    const submitBtn = screen.getByLabelText(/add\sa\steam/)

    userEvent.type(nameField, 'Baguettes')
    userEvent.type(cityField, 'Paris')
    userEvent.type(stateField, 'France')
    userEvent.click(submitBtn)

    await screen.findByText(/Team\sadded/)
    screen.getByText(/Baguettes/)
    screen.getByText(/Paris/)
    screen.getByText(/France/)
    screen.getByRole('link', { to: 'teams/view' })
})
