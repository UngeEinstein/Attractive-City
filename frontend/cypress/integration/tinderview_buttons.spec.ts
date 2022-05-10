import experienceService from "../../src/services/experiences";

const baseUrl = "http://localhost:3000/";

beforeEach(() => {
  experienceService.resetTestDB();
  cy.visit(baseUrl);
  cy.wait(4000);
  // Make sure all experiences are ignored
  cy.get("#ignore-button").click();
  cy.get("#ignore-button").click();
  cy.get("#ignore-button").click();
  cy.get("#ignore-button").click();
  cy.get("#ignore-button").click();
});

describe("Tinder view buttons", () => {
  it("contains ignore, favorite and like button", () => {
    cy.get("#ignore-button");
    cy.get("#favorite-button");
    cy.get("#like-button");
  });
  it("ignore button does not add to saved list", () => {
    let title: string;
    return cy.get("#experience-title").then(($el: any) => {
      title = $el.text() as string;
      cy.get("#ignore-button").click();
      cy.visit(baseUrl + "saved");
      cy.contains(title, { matchCase: false }).should("not.exist");
    });
  });
  it("like button adds experience to saved list, not as favorite", () => {
    let title: string;
    return cy.get("#experience-title").then(($el: any) => {
      title = $el.text() as string;
      cy.get("#like-button").click();
      cy.visit(baseUrl + "saved");
      cy.contains(title, { matchCase: false });
      cy.get("#check-favorite").check();
      cy.contains(title, { matchCase: false }).should("not.exist");
    });
  });
  it("favorite button adds experience to saved list and marks as favorite", () => {
    let title: string;
    return cy.get("#experience-title").then(($el: any) => {
      title = $el.text() as string;
      cy.get("#favorite-button").click();
      cy.visit(baseUrl + "saved");
      cy.contains(title, { matchCase: false });
      cy.get("#check-favorite").check();
      cy.contains(title, { matchCase: false });
    });
  });
});
