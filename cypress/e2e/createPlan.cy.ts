describe("Creación de un plan", () => {
  it("Happy path - crea un plan correctamente", () => {
    cy.visit("http://localhost:3000/plans/create");

    cy.window().then((win) => {
      win.localStorage.setItem(
        "id",
        "083462b0-df87-4771-b595-ac670fd510e2"
      );
      win.localStorage.setItem("username", "samuel05");
    });

    cy.get('input[name="image"]').type("https://example.com/image.jpg");
    cy.get('input[name="name"]').type("Plan Cypress Samuel");
    cy.get('input[name="address"]').type("Universidad de los Andes");
    cy.get('input[name="estimatedPrice"]').type("10000");
    cy.get('input[name="estimatedTime"]').type("120");

    cy.get('textarea[name="description"]').type(
      "Plan creado desde Cypress"
    );

    cy.get('input[name="recommendations"]').type("Llevar agua");

    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/plans");
    cy.contains("Plan Cypress Samuel").should("exist");
  });

  it("Edge case - no permite crear un plan con precio 0", () => {
    cy.visit("http://localhost:3000/plans/create", {
      timeout: 120000,
    });

    cy.get('input[name="image"]').type("https://example.com/image.jpg");
    cy.get('input[name="name"]').type("Plan Invalido");
    cy.get('input[name="address"]').type("Universidad de los Andes");
    cy.get('input[name="estimatedPrice"]').type("0");
    cy.get('input[name="estimatedTime"]').type("120");

    cy.get('textarea[name="description"]').type(
      "Este plan no debe ser creado"
    );

    cy.get('button[type="submit"]').click();

    cy.get('input[name="estimatedPrice"]:invalid').should("exist");
    cy.url().should("include", "/plans/create");
  });
});