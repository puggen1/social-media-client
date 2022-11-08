// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
import "cypress-localstorage-commands";
import { login, createPost, logout, deletePost } from "../../src/js/api/index";

// -- This is a parent command --
Cypress.Commands.add("loginUser", async (email, password) => {
  await login(email, password);
});
Cypress.Commands.add("createPost", async (title, body) => {
  let response = await createPost(title, body);
  return response;
});
Cypress.Commands.add("logout", async () => {
  logout();
});
Cypress.Commands.add("deletePost", async (id) => {
  await deletePost(id);
});
Cypress.Commands.add("clearStorage", async () => {
  await cy.clearLocalStorage();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
