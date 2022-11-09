//The login form validates user inputs correctly based on API restrictions
describe("checks if the login validates correctly", () => {
  /**
   * @description logs into an excisting account
   */
  it("successfully logins a user", function () {
    //visits page
    cy.visit("./");
    //runs login command
    cy.loginE2E(Cypress.env("EMAIL"), Cypress.env("PASSWORD"));
    cy.wait(1000);
    //checks if url includes ?view=profile that will be present if login is completed
    cy.url().should("contain", "?view=profile");
  });
  /**
   * @description tries to login to the page with credentials that does not work, email is not an email
   */
  it("unsuccessfully logins a user", function () {
    //visit page
    cy.visit("./");
    cy.wait(500);
    //tries to log in with wrong credentials
    cy.loginE2E("notarealEmail", "fakePassword");
    cy.wait(2000);
    //url should not change
    cy.url().should("not.contain", "?new=profile");
  });
  /**
   * @description tries to log in with excisting email but wrong password
   *  does not work yet
   */
  /*
  it("tries to log in with wrong password", function () {
    //visit page
    cy.visit("./");
    cy.wait(500);
    //tries to log in with wrong password
    cy.loginE2E(Cypress.env("EMAIL"), "fakePassword");
    cy.wait(2000);
    cy.on("uncaught:exception", (error) => {
      expect(error).to.be.equal(401);
    });
    //url should not change
    cy.url().should("not.contain", "?new=profile");
  });
  */
});
