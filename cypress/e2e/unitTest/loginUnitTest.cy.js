describe("checks the javascript function for login", () => {
  it("logs into the api, and check for token in localstorage", () => {
    //visits development build
    cy.visit("./");
    //clears localstorage
    cy.clearStorage;
    //calls the login function and then checks if the token was added to the localstorage
    cy.loginUser(Cypress.env("EMAIL"), Cypress.env("PASSWORD"));
    cy.getLocalStorage("token").then((token) => {
      cy.wait(1000);
      expect(token.length).to.be.greaterThan(1);
    });
  });
});
