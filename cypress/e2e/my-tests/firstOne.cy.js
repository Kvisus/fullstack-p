describe("Navigation", () => {
  it("should navigate to the home page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");
  });
  it("should navigate to the blog page", () => {
    cy.visit("http://localhost:3000/");
    cy.get('a[href="/blog"]').first().click();
    cy.url().should("include", "/blog");

    cy.get("h1").contains("Blog");
  });

  // it("should navigate to the url shortener page", () => {
  //   cy.visit("http://localhost:3000/");
  //   cy.get('a[href="/url-shortener"]').first().click();
  //   cy.url().should("include", "/url-shortener");

  //   cy.get("h1").contains("Url Shortener");
  // });
  it("should navigate to test link and get redirrected", () => {
    cy.visit("http://localhost:3000/go/gogogo");
    cy.url().should("include", "google.com");
  });
});

// describe("Url Shortener", () => {
//   it("should navigate to the url shortener page", () => {
//     cy.visit("http://localhost:3000/");
//     cy.get('a[href="/url-shortener"]').first().click();
//     cy.url().should("include", "/url-shortener");

//     cy.get("h1").contains("Url Shortener");
//   });
//   // it("should create a new short link", () => {
//   //   cy.visit("http://localhost:3000/url-shortener");
//   //   cy.get('input[name="url"]').type("https://example.com");
//   //   cy.get('button[type="submit"]').click();
//   //   cy.get("h1").contains("Url Shortener");
//   // });
// });
