import { render, fireEvent } from '@testing-library/react'
import { Thumbnails } from '../components/Thumbnails'
import { titleRef } from '../firebase'
import { useCollectionData } from "react-firebase-hooks/firestore"

describe('Thumbnails', () => {
    it('revieves thumbnails', () => {
        const Test = () => {
            const [snapshot] = useCollectionData(titleRef)
            expect(snapshot.length).toBeGreaterThan(1)
        }
    })

    it('renders thumbnails', () => {
        const { queryByTitle } = render(<Thumbnails genre='science' />)
        const thumbnail = queryByTitle('thumbnails')
        expect(thumbnail).toBeTruthy()
    })

    it('should display culture thumbnails', () => {
        const { queryByTitle } = render(<Thumbnails genre='history' />)
        const culture = queryByTitle('culture')
        fireEvent.click(culture)
        const heading = queryByTitle('heading')
        expect(heading.innerHTML).toBe('culture')
    })

    it('should display science thumbnails', () => {
        const { queryByTitle } = render(<Thumbnails genre='culture' />)
        const science = queryByTitle('science')
        fireEvent.click(science)
        const heading = queryByTitle('heading')
        expect(heading.innerHTML).toBe('science')
    })

    it('should display history thumbnails by prop', () => {
        const { queryByTitle } = render(<Thumbnails genre='history' />)
        const heading = queryByTitle('heading')
        expect(heading.innerHTML).toBe('history')
    })
})