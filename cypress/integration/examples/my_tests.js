describe('Pizza Ordering App', function() {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        openForm().click()
    })
    const nameInput = () => cy.get('input[name=name]')
    const sizeInput = () => cy.get('select[name=sizeSelect]')
    const toppings = () => cy.get('input[type=checkbox]')
    const instructions = () => cy.get('input[name=instructions]')
    const openForm = () => cy.get('.openForm')
    const submit = () => cy.get('.add')

    it('check that testing works', function() {
        expect(1+1).to.equal(2)
    })

    it('can type a name', function() {
        nameInput().type('John Smith')
        .should('have.value', 'John Smith')
    })

    it('can select a size', function() {
        sizeInput().select('2')
    })

    it('can select multiple toppings', function() {
        toppings().check()
    })

    it('can type special instructions', function() {
        instructions().type('Make my pizza with love!')
    })

    it('can submit the order form', function() {
        nameInput().type('John Smith')
        sizeInput().select('2')
        toppings().check()
        submit().click()
    })
})