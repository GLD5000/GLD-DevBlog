describe("template spec", () => {
  it("H1 contains correct text", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-test='hero-heading']").contains("DevBlog");
  });
});
