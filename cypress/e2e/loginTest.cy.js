import { login } from "../../src/js/api/auth/login";

describe("checks the javascript function for login", () => {
  it("logs into the api, and check for token in localstorage", async () => {
    //visits development build
    cy.visit("./");
    //clears localstorage
    await cy.clearLocalStorage("token");
    //calls the login function and then checks if the token was added to the localstorage
    await login(Cypress.env("EMAIL"), Cypress.env("PASSWORD")).then(() => {
      expect(cy.getLocalStorage("token")).to.not.be.undefined;
    });
  });
});
