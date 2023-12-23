//Nada Mughrabi
import {countryOptions, languageOptions, serviceTypes, cabinTypes, sortOptions} from "../support/constants.js"

describe('SeeraFrontendCodeChallenge', () => {

  it('testPriceRangeFilter', () => {
    //Added to avoid cypress crash on website uncaught JS exceptions
    cy.on('uncaught:exception', () => false);

    //Open Almosafer
    cy.visit('/')
    cy.setPreferredCountry(countryOptions.saudiArabia) 
    cy.setPreferredLanguage(languageOptions.english)
    cy.setServiceType(serviceTypes.flights)

    //Set Flight Search Query Criterias
    cy.setOriginAirportRandomly()
    cy.setDestinationAirportRandomly()
    cy.setFlightDateRandomly()
    cy.setCabinType(cabinTypes.economy) 
    cy.setPassengers(1,0,0)

    //Submit query and await transition to search result page and result load
    cy.submitSearchQuery()
    cy.removeInsuranceModal()
    cy.awaitSearchLoad()

    //Set sort by cheapest
    cy.setSortOption(sortOptions.cheapest) 

    //Test Price Range Minimum against results
    cy.expandPriceRangeFilter()

    cy.get('[data-testid="FlightSearchResult__PriceFilter__Min"]')
    .then($element => {
      const priceFilterMinText = $element.text();
      const PriceFilterlowestPriceValue = priceFilterMinText.match(/\d+,*\d+/)[0].toString()

      cy.get('[data-testid="Group0_container"]').find('[data-testid="Group0__PriceLabel"]').then(($text) => {
          const searchResultLowestPrice = $text.text().trim().toString()
          expect(searchResultLowestPrice).equal(PriceFilterlowestPriceValue)
      })
    })

  })
})