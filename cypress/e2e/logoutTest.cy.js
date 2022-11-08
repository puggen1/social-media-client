import { logout } from "../../src/js/api/auth/logout";
import { login } from "../../src/js/api/auth/login";

describe("checks the javascript function for logging out", () => {
  it("logs into the api so we can log out..", async () => {
    //visits development build
    cy.visit("./");

    //clears localstorage
    await cy.clearLocalStorage("token");
    //calls the login function and then checks if the token was added to the localstorage
    await login(Cypress.env("EMAIL"), Cypress.env("PASSWORD")).then(() => {
      expect(cy.getLocalStorage("token")).to.not.be.undefined;
    });
  });
  it("logs out using the logout function", () => {
    //goes to the page
    cy.visit("./");
    //runs javascript command
    logout();
    //checks if token is null
    cy.getLocalStorage("token").then((token) => {
      expect(token).to.be.null;
    });
    //checks if profile is null
    cy.getLocalStorage("profile").then((profile) => {
      expect(profile).to.be.null;
    });
  });
});
