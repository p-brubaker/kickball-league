import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router-dom' 
import TeamDetail from './TeamDetail'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import mockPlayers from '../../mocks/players.json'

const mockTeam = {
    id: 1,
    created_at: '2021-12-12T05:34:30.551Z',
    name: 'Rose City Roasters',
    city: 'Portland',
    state: 'Oregon',
    players: []
}

const server = setupServer(
    rest.get('https://paozlutduarjgvzaiduh.supabase.co/rest/v1/players', 
        (req, res, ctx) => {
            return res(ctx.json(mockPlayers))
        }
    ),
    rest.get('https://paozlutduarjgvzaiduh.supabase.co/rest/v1/teams',
        (req, res, ctx) => {
            return res(ctx.json(mockTeam))
        }
    )
)

beforeAll(() => {
    server.listen()
})

afterAll(() => {
    server.close()
})

it('should render team details and a list of that teams players', async () => {
    const { container } = render(
        <MemoryRouter>
            <TeamDetail match={{params: {id: 1}}}/>
        </MemoryRouter>
    )

    screen.getByText(/Loading.../)

    await screen.findByText(/Players/)
    expect(container).toMatchSnapshot()
})

