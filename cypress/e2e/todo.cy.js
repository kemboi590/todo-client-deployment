/// <reference types="cypress" />

describe('Todos CRUD E2E Test', () => {

    beforeEach(() => {
         cy.viewport(1920, 900);
        cy.loginAsAdmin();
    });

    it('should create a todo via the UI', () => {
        const todoName = `Cypress E2E Test Todo ${Date.now()}`;
        cy.get('[data-test="create-todo-button"]').click();
        cy.get('[data-test="todo-name-input"]').type(todoName);
        cy.get('[data-test="todo-description-input"]').type('Created by Cypress');
        cy.get('[data-test="todo-userid-input"]').type('3');
        cy.get('[data-test="todo-date-input"]').type('2025-07-09');
        cy.get('[data-test="todo-status-pending"]').check();
        cy.get('[data-test="createtodo-submit-button"]').click();
        cy.contains('Todo created successfully').should('be.visible');
        cy.contains(todoName).should('be.visible')

        //spying on the DELETE request
        cy.intercept('DELETE', '/todo/*').as('deleteTodo'); 

        cy.contains('tr', todoName).within(() => {
            cy.get('[data-test="delete-todo-button"]').click();
        });
        cy.get('[data-test="delete-todo-confirm-button"]').click();

        // Wait for the DELETE request to finish
        cy.wait('@deleteTodo');
    });



    it('should update a todo via the UI', () => {
        const todoName = `Cypress E2E Test Todo ${Date.now()}`;
        const updatedTodoName = `Updated Cypress Todo ${Date.now()}`;

        cy.get('[data-test="create-todo-button"]').click()
        cy.get('[data-test="todo-name-input"]').type(todoName);
        cy.get('[data-test="todo-description-input"]').type('Created by Cypress');
        cy.get('[data-test="todo-userid-input"]').type('3');
        cy.get('[data-test="todo-date-input"]').type('2025-07-09');
        cy.get('[data-test="todo-status-pending"]').check();
        cy.get('[data-test="createtodo-submit-button"]').click();
        cy.contains('Todo created successfully').should('be.visible');
        cy.contains(todoName).should('be.visible');

        // Now update the todo
        cy.contains('tr', todoName).within(() => {
            cy.get('[data-test="edit-todo-button"]').click();
        });
        cy.get('[data-test="edit-todo-name-input"]').clear().type(updatedTodoName);
        cy.get('[data-test="edit-todo-status-completed"]').check();
        cy.get('[data-test="update-todo-button"]').click();
        cy.contains('Todo updated successfully').should('be.visible');
        cy.contains(updatedTodoName).should('be.visible');


        cy.intercept('DELETE', '/todo/*').as('deleteTodo');

        cy.contains('tr', updatedTodoName).within(() => {
            cy.get('[data-test="delete-todo-button"]').click();
        });
        cy.get('[data-test="delete-todo-confirm-button"]').click();

        // Wait for the DELETE request to finish
        cy.wait('@deleteTodo');
    });
});




