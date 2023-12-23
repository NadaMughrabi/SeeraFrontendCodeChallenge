declare namespace Cypress {
    interface Chainable {
        setPassengers(param: int, param: int,param: int): Cypress.Chainable<JQuery>;
        setSortOption(param: int): Cypress.Chainable<JQuery>;
        setLanguagetoEnglish(): Cypress.Chainable<JQuery>;
        setPreferredCountry(param: int): Cypress.Chainable<JQuery>;
        setOriginField(): Cypress.Chainable<JQuery>;
        setDestinationField(): Cypress.Chainable<JQuery>;
        setFlightDate(): Cypress.Chainable<JQuery>;
        setCabinType(param: int): Cypress.Chainable<JQuery>;
        removeInsuranceModal(): Cypress.Chainable<JQuery>;
        checkLowestPrice(): Cypress.Chainable<JQuery>;

    }
}