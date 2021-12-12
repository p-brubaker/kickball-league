import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header.jsx'

it('should render the header with links to home, players, teams', async () => {
    const { container } = render(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    )

    expect(container).toMatchSnapshot()
})
