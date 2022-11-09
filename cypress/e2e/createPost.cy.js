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
    cy.wait(2000);
    //clicks the post button
    cy.get("button").contains("Post").click();
    //check if includes postId=
    cy.wait(3000);
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
    cy.wait(500);
    //checks if we are on the new post page
    cy.url().should("contain", "?view=post");
    //writes in some fields but not title
    cy.get("#postTags").type("cypress, e2e", 2000);
    cy.get("#postBody").type("this test should not go trough", 2000);
    //clicks the post button
    cy.get("button").contains("Post").click();
    cy.wait(3000);
    cy.url().should("not.contain", "postId=");
  });
});

/*
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
    cy.wait(500);*/
