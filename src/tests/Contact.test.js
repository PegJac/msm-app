import { render } from '@testing-library/react'
import { emailChecker } from '../utils/emailChecker'
import { Contact } from '../components/Contact'

describe('Contact page', () => {
    it('Should render contact page', () => {
        const { queryByTitle } = render(<Contact />)
        const contact = queryByTitle("contact")
        expect(contact).toBeTruthy()
    })

    it('Should render about section', () => {
        const { queryByTitle } = render(<Contact />)
        const about = queryByTitle("about")
        expect(about).toBeTruthy()
    })
})

describe('Contact form', () => {
    it('Should render form', () => {
        const { queryByTitle } = render(<Contact />)
        const form = queryByTitle("form")
        expect(form).toBeTruthy()
    })
})

describe('Email checker', () => {
    describe('Valid', () => {
        it('Should return valid long', () => {
            expect(emailChecker("peggy.jacobson@outlook.com")).toBeTruthy()
        })

        it('Should return valid short', () => {
            expect(emailChecker("peg@jac.se")).toBeTruthy()
        })
    })

    describe('false', () => {
        it('Should return invalid missing peggy.jacobson', () => {
            expect(emailChecker("@outlook.com")).toBeFalsy()
        })

        it('Should return invalid missing @', () => {
            expect(emailChecker("peggy.jacobsonoutlook.com")).toBeFalsy()
        })

        it('Should return invalid missing outlook', () => {
            expect(emailChecker("peggy.jacobson@.com")).toBeFalsy()
        })

        it('Should return invalid missing .com', () => {
            expect(emailChecker("peggy.jacobson@outlook")).toBeFalsy()
        })
    })
})