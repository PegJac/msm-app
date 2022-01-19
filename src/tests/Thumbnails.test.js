import { render, fireEvent } from '@testing-library/react'
import { GenrePicker } from '../components/GenrePicker'
import { LandingPage } from '../components/LandingPage'
import { Thumbnails } from './../components/Thumbnails'

it('Does thumbnails get rendered', () => {
    const { queryByTitle } = render(<Thumbnails genre='history' />)
    const thumbnail = queryByTitle('thumbnails')
    expect(thumbnail).toBeTruthy()
})

describe('Genre tabs', () => {
    it('should display correct thumbnails', () => {
        const { queryByTitle } = render(<Thumbnails genre='history' />)
        const culture = queryByTitle('culture')
        fireEvent.click(culture)
        const heading = queryByTitle('heading')
        expect(heading.innerHTML).toBe('culture')
    })
})

/* describe('click genre tab', () => {
    it('onClick', () => {
        const { queryByTitle } = render(<Thumbnails genre='history' />)
        const culture = queryByTitle('culture')
        fireEvent.click(culture)
    })
}) */

/* describe('click genre on landing page', () => {
    it('onClickGenrePicker', () => {
        const { queryByTitle } = render(<GenrePicker />)
        const culture = queryByTitle('culture')
        fireEvent.click(culture)
        const heading = queryByTitle('heading')
        expect(heading.innerHTML).toBe('culture')
    })
}) */