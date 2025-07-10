describe('Fundamentals Tests', () => {
  beforeEach(() => {
    // This will run before each test in this block
    cy.visit('/')
  })
  // All Tests
  it('Containts Correct header text', () => {
    // cy.visit('/')
    // cy.get('h1').contains("Welcome to TodoPro!") // this is the most common way to check for text in an element, its a bad practice to use the h1 tag directly, as it can change in the future.


    cy.getDataTest('todo-welcome-header').contains("Welcome to TodoPro!") // This is a custom command that uses the data-test attribute to find the element
    //It is important to note that this will only work if the text is exactly "Welcome to TodoPro!" including case sensitivity.
    // cy.get('[data-test="todo-welcome-header"]').contains("Welcome to TodoPro!")
    //The `data-test` attribute is often used in testing to target specific elements without relying on classes or IDs that may change.

    // cy.get('[data-test="todo-welcome-header"]').contains(/Welcome to TodoPro!/i) // This is a case-insensitive match
    // The `/i` at the end makes the match case-insensitive, so it will

    // cy.get('[data-test="todo-welcome-header"]').should('contain.text', 'Welcome to TodoPro!')

    // cy.contains("Welcome to TodoPro!")

  })

  it('Menu works Correctly', () => {
    // cy.visit('/')

    // Click on the mobile menu bars to open the dropdown
    cy.get('[data-test="todo-mobile-menu-bars"]').click()

    // Check if the menu dropdown is visible
    // cy.get('.menu.menu-sm.dropdown-content').should('be.visible')
    // or
    cy.get('[data-test="todo-ul-menu"]').should('be.visible')


    // Verify all menu items are present and visible
    cy.get('[data-test="todo-ul-menu"]').within(() => {
      // Check Home link
      cy.contains('Home').should('be.visible')
      cy.get('a[href="/"]').should('contain.text', 'Home')
      cy.get('a[href="/"]').should('have.attr', 'href', '/')

      // Check About link
      cy.contains('About').should('be.visible')
      // a[href="/about" means it is looking for an anchor tag with an href attribute that equals "/about"
      cy.get('a[href="/about"]').should('contain.text', 'About')
      // Check Dashboard link
      cy.contains('Dashboard').should('be.visible')

      // Check Register and Login links (these appear when user is not logged in)
      cy.contains('Register').should('be.visible')
      cy.get('a[href="/register"]').should('contain.text', 'Register')

      cy.contains('Login').should('be.visible')
      cy.get('a[href="/login"]').should('contain.text', 'Login')
    })

    // Optional: Test that clicking on a menu item works
    cy.get('.menu.menu-sm.dropdown-content').within(() => {
      cy.get('a[href="/about"]').click()
    })

    // Verify navigation worked (adjust URL based on your routing)
    cy.url().should('include', '/about')
  })
})