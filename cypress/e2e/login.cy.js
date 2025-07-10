describe("form tests", () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it("should login with valid credentials", () => {
        // assert that we are in the login page
        cy.contains(/Login to Your Account/i).should('be.visible')
        //Get the email input 
        // cy.get('[data-test="login-email-input"]')
        cy.getDataTest('login-email-input').as('login-emailInput')

        cy.get('@login-emailInput')
            .should('be.visible')
            .should('have.attr', 'type', 'email')
            .type('bkemboi590@gmail.com')

        // Get the password input
        // cy.get('[data-test="login-password-input"]')
        // .should('be.visible')
        //     .should('have.attr', 'type', 'password')
        //     .type('mypassword123')
        cy.getDataTest('login-password-input').as('login-passwordInput')

        cy.get('@login-passwordInput')
            .should('be.visible')
            .should('have.attr', 'type', 'password')
            .type('mypassword123')

        // Submit the form
        // cy.get('[data-test="login-submit-button"]')
        cy.getDataTest('login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Login')
            .should('not.be.disabled')
            .click()

        cy.contains(/Login successful/i).should('be.visible')
        cy.wait(1000)
        cy.contains(/Login successful/i).should('not.exist')

        //check if the URL goes to admin dashboard -/admin/dashboard/todos
        cy.url().should('include', '/admin/dashboard/todos')
    })

    // Netgative test case for login
    it("should not login with invalid credentials", () => {
        cy.contains(/Login to Your Account/i).should('be.visible')

        // Get the email input
        cy.getDataTest('login-email-input').as('login-emailInput')
        cy.get('@login-emailInput')
            .type('bkemboi590@gmail.com')

        // Get the password input
        cy.getDataTest('login-password-input').as('login-passwordInput')
        cy.get('@login-passwordInput')
            .type('wrongpassword123')

        // Submit the form
        cy.getDataTest('login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Login')
            .click()

        // Assert that the error message is displayed
        cy.contains(/Login failed. Please check your credentials and try again./i).should('be.visible')
        cy.wait(1000)
        cy.contains(/Login failed. Please check your credentials and try again./i).should('not.exist')
    })
})