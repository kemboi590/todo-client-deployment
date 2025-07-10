// filepath: d:\My Classes\7. Testing\cypres-todo-app\client\cypress\e2e\signup.cy.js
describe("signup form tests", () => {
    beforeEach(() => {
        cy.visit('/register');
    });

    it("should signup with valid credentials", () => {
        // Mock the signup API call with a successful response
        cy.intercept('POST', '/auth/register', {
            statusCode: 201,
            body: {
                message: 'Registration successful! Please check your email to verify your account.',
                user: {
                    id: 123,
                    firstName: 'TestUser',
                    lastName: 'AdminTester',
                    email: 'kemboi.brian@teach2give.com',
                    role: 'user',
                    isVerified: false
                }
            }
        }).as('signup');

        // Fill the form using data-test attributes
        cy.getDataTest('signup-firstname').as('firstNameInput')
        cy.get('@firstNameInput')
            .type('TestUser')

        cy.getDataTest('signup-lastname').as('lastNameInput')
        cy.get('@lastNameInput')
            .type('AdminTester')

        cy.getDataTest('signup-email').as('emailInput')
        cy.get('@emailInput')
            .should('have.attr', 'type', 'email')
            .type('kemboi.brian@teach2give.com')

        cy.getDataTest('signup-password').as('passwordInput')
        cy.get('@passwordInput')
            .should('have.attr', 'type', 'password')
            .type('mypass123');

        cy.getDataTest('signup-confirmpassword').as('confirmPasswordInput')
        cy.get('@confirmPasswordInput')
            .should('have.attr', 'type', 'password')
            .type('mypass123');

        // Submit the form
        cy.getDataTest('signup-submitbtn').as('submitButton')
        cy.get('@submitButton')
            .should('contain.text', 'Register')
            .should('not.be.disabled')
            .click()

        // Wait for the mocked signup API call
        cy.wait('@signup')
            .then((interception) => {
                expect(interception.response.statusCode).to.eq(201);
                // Verify the request body contains the expected data
                expect(interception.request.body).to.deep.include({
                    firstName: 'TestUser',
                    lastName: 'AdminTester',
                    email: 'kemboi.brian@teach2give.com',
                    password: 'mypass123',
                    confirmPassword: 'mypass123'
                });
            });

        // Assert success toast
        cy.contains(/Registration successful/i, { timeout: 10000 })

        // Should redirect to verification page
        cy.url().should('include', '/register/verify')
    });

    it("should show validation errors for empty fields", () => {
        cy.getDataTest('signup-submitbtn').as('submitButton')
        cy.get('@submitButton')
            .should('contain.text', 'Register')
            .click()

        cy.contains(/First name is required/i);
        cy.contains(/Last name is required/i);
        cy.contains(/Email is required/i);
        cy.contains(/Password is required/i);
        cy.contains(/Confirm password is required/i)
    });

    it("should show error if passwords do not match", () => {
        cy.getDataTest('signup-firstname').as('firstNameInput')
        cy.get('@firstNameInput').type('TestUser');

        cy.getDataTest('signup-lastname').as('lastNameInput')
        cy.get('@lastNameInput').type('AdminTester');

        cy.getDataTest('signup-email').as('emailInput')
        cy.get('@emailInput').type('kemboi.brian@teach2give.com');

        cy.getDataTest('signup-password').as('passwordInput')
        cy.get('@passwordInput').type('mypass123');

        cy.getDataTest('signup-confirmpassword').as('confirmPasswordInput')
        cy.get('@confirmPasswordInput').type('differentpass')

        cy.getDataTest('signup-submitbtn').as('submitButton')
        cy.get('@submitButton')
            .should('contain.text', 'Register')
            .click()

        cy.contains(/Passwords must match/i)
    });

});