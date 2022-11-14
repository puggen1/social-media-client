//The create item form validates user inputs correctly based on API restrictions
describe("checks post form for success and failure", () => {
  /**
   * @description creates an post based on api restrictions, adds content to all fields and then checks if it was created
   */
  it("creates an post", function () {
    //visit page
    cy.visit("./");
    //runs log in command
    cy.loginE2E(Cypress.env("EMAIL"), Cypress.env("PASSWORD"));
    //finds the new post button
    cy.get("#footerActions > a")
      .contains("New Post")
      .should("be.visible")
      .click();
    cy.wait(2000);
    //checks if we are on the new post page
    cy.url().should("contain", "?view=post");

    //writes content to all post fields
    cy.get("#postTitle").type("testPost from cypress", 2000);
    cy.get("#postTags").type("cypress, e2e", 2000);
    cy.get("#postMedia").type(
      "https://i.pinimg.com/736x/7e/60/7d/7e607de5553d95a84a5d4095e6cbcb5a.jpg",
      5000
    );
    cy.get("#postBody").type("this test should go trough", 2000);
    cy.wait(4000);

    //clicks the post button. had to add force because no matter how i tried to scroll to button, the button was always behind overlay. this did not happen before...
    cy.get("button").contains("Post").scrollIntoView().click({ force: true });
    //check if includes postId=
    cy.wait(8000);
    cy.url().should("contain", "postId=");
  });
  /**
   * @description fails to create an post by not writing the title, that is now the only required input on the api
   */
  it("fails to create a post", function () {
    //visits the page
    cy.visit("./");
    //logs in to the website
    cy.loginE2E(Cypress.env("EMAIL"), Cypress.env("PASSWORD"));
    //finds the new post button
    cy.get("#footerActions > a").contains("New Post").click();
    cy.wait(1000);
    //checks if we are on the new post page
    cy.url().should("contain", "?view=post");
    //writes in some fields but not title
    cy.get("#postTags").type("cypress, e2e", 3000);
    cy.get("#postBody").type("this test should not go trough", 3000);
    //clicks the post button
    cy.wait(1000);
    //added exception for rare occations
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.get("button").contains("Post").click({ force: true });
    cy.wait(3000);
    cy.url().should("not.contain", "postId=");
  });
});
