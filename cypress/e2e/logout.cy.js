describe("checks if the logout button logs the user out", () => {
  it("logs the user out", function () {
    //visit page
    cy.visit("./");
    //runs log in command
    cy.loginE2E(Cypress.env("EMAIL"), Cypress.env("PASSWORD"));
    cy.wait(2000);
    cy.get("button").contains("Logout").click();
    cy.url().should("not.contain", "?view=profile&name");
  });
});
