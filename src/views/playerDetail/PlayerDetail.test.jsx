import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import PlayerDetail from './PlayerDetail'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const mockPlayer = {
    id: 10,
    created_at: '2021-12-12T05:34:30.551Z',
    name: 'Bud Hayes',
    team_id: 1,
    position: 'Designated Hitter'
}

const mockTeam = {
    id: 1,
    created_at: '2021-12-12T05:34:30.551Z',
    
}

const server = setupServer(
    rest.get('https://paozlutduarjgvzaiduh.supabase.co/rest/v1/players',
        (req, res, ctx) => {
            return res(ctx.json([mockPlayer]))
        }
    ),
    rest.get('https://paozlutduarjgvzaiduh.supabase.co/rest/v1/teams',
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

it('should render player details', async () => {
    const { container } = render(
        <MemoryRouter>
            <PlayerDetail match={{params: { id: 1 }}} />
        </MemoryRouter>
    )

    screen.getByText(/Loading.../)

    await screen.findByText(/Name:/)
    screen.getByText(/Position:/)
    screen.getByText(/Team:/)
    expect(container).toMatchSnapshot()

})
