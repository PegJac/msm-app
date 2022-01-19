describe('my first test', () => {
    it('does little', () => {
        cy.visit("http://localhost:3000/admin")
        cy.contains("msm")
    })
})