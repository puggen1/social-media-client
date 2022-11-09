describe("check if the create item function works", () => {
  it("creates a post check if it was created and then deletes it", () => {
    //visits development build
    cy.visit("./");
    //clears localstorage
    cy.clearStorage;
    //calls the login function
    cy.loginUser(Cypress.env("EMAIL"), Cypress.env("PASSWORD"));
    // creates a post
    cy.createPost(
      "cypress unit-test?",
      "creating a unit test by accessing localstorage trough cypress"
    ).then((response) => {
      //checks if response from create post has an id
      expect(response.id).to.not.be.undefined;
      //deletes the post after test is completed
      cy.wait(1000);
      cy.deletePost(response.id);
    });
  });
});
