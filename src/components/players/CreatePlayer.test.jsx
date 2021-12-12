import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import CreatePlayer from './CreatePlayer'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import userEvent from '@testing-library/user-event'

const mockPlayer = {
    id: 10,
    created_at: '2021-12-12T05:34:30.551Z',
    name: 'Bud Hayes',
    team_id: 1,
    position: 'Designated Hitter'
}

const server = setupServer(
        rest.post('https://paozlutduarjgvzaiduh.supabase.co/rest/v1/players',
            (req, res, ctx) => {
                return res(ctx.json([mockPlayer]))
            }
        )
    )

    beforeAll(() => {
        server.listen()
    })

    afterAll(() => {
        server.close()
    })

it('should render create player form, then the created player', async () => {

    render(
        <MemoryRouter>
            <CreatePlayer match={{params: { teamID: 1 } }} />
        </MemoryRouter>
    )

    const nameField = screen.getByLabelText(/Name:/)
    const positionField = screen.getByLabelText(/Position:/)
    const submitBtn = screen.getByLabelText(/add\sa\splayer/)
    
    userEvent.type(nameField, 'Bud Hayes')
    userEvent.type(positionField, 'Designated Hitter')
    userEvent.click(submitBtn)

    await screen.findByText(/Player\sadded/)
    screen.getByText(/Bud\sHayes/)
    screen.getByText(/Designated\sHitter/)
    screen.getByRole('link', { to: '/teams/view/1'})
})
