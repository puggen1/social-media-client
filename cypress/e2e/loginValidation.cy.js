//The login form validates user inputs correctly based on API restrictions
describe("checks if the login validates correctly", () => {
  it("successfully logins a user", function () {
    //visit page
    cy.visit("./");
    cy.wait(500);
    //finds login button and clicks it
    cy.get(`#registerForm button`).contains("Login", { timeout: 5000 }).click();
    cy.wait(500);
    //type email and password into fields
    cy.get("#loginEmail").type(Cypress.env("EMAIL"), 2000);
    cy.get("#loginPassword").type(Cypress.env("PASSWORD"), 2000);
    //clicks login button
    cy.get("#loginForm button").contains("Login").click();
    //checks if url includes ?view=profile that will be present if login is completed
    cy.url().should("contain", "?view=profile");
  });
  it("unsuccessfully logins a user", function () {
    cy.visit("./");
    cy.wait(500);
    //finds login button and goes to login modal
    cy.get(`#registerForm button`).contains("Login", { timeout: 5000 }).click();
    cy.wait(500);
    cy.get("#loginEmail").type("notarealEmail", 2000);
    cy.get("#loginPassword").type("fakePassword", 2000);
    //finds and clicks login button
    cy.get("#loginForm button").contains("Login").click();
    //url should not change
    cy.url().should("not.contain", "?new=profile");
  });
});
