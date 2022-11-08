import { login } from "../../src/js/api/auth/login";
import { createPost } from "../../src/js/api/posts/create";
import { deletePost } from "../../src/js/api/posts/delete";

describe("check if the create item function works", () => {
  it("logs into the api", async () => {
    //visits development build
    cy.visit("./");
    //clears localstorage
    await cy.clearLocalStorage("token");
    //calls the login function and then checks if the token was added to the localstorage
    await login(Cypress.env("EMAIL"), Cypress.env("PASSWORD"));
    let response = await createPost(
      "cypress unit-test?",
      "creating a unit test by accessing localstorage trough cypress"
    );
    //checks if response from create post has an id
    expect(response.id).to.not.be.undefined;
    //deletes the post after test is completed
    await deletePost(response.id);
  });
});
