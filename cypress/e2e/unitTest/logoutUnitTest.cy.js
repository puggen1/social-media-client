describe("checks the javascript function for logging out", () => {
  before(function () {
    //visits development build
    cy.visit("./");
    //clears localstorage
    cy.clearStorage;
    //calls the login function and then checks if the token was added to the localstorage
    cy.loginUser(Cypress.env("EMAIL"), Cypress.env("PASSWORD"));
    cy.getLocalStorage("token").then((token) => {
      expect(token.length).to.be.greaterThan(1);
    });
  });
  it("logs out using the logout function", function () {
    cy.wait(1000);
    //checks if token is still there...
    cy.getLocalStorage("token").then((key) => {
      expect(key.length).to.be.greaterThan(1);
    });
    //runs javascript command
    cy.logout();
    //checks if token is null
    cy.getLocalStorage("token").then((key) => {
      expect(key).to.be.null;
    });
    //checks if profile is null
    cy.getLocalStorage("profile").then((key) => {
      expect(key).to.be.null;
    });
  });
});
