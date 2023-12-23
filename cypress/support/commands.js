import {countryOptions, languageOptions, serviceTypes, cabinTypes, sortOptions} from "./constants.js"

/*
  Command to set the country on website visit.
*/
Cypress.Commands.add('setPreferredCountry', (preferredCountry) => {
  
  cy.get('body').then($body => {
    if( $body.find('.js-modal-root').length > 0 ) { //Ensure that modal is showing

      if(preferredCountry == countryOptions.saudiArabia){
        cy.get('.cta__saudi').click({force: true})
      }
      else if(preferredCountry == countryOptions.WW){
        cy.get('.cta__continue').click({force: true})
      }
      
    }
  })

})

/*
  Command to set the language.
*/
Cypress.Commands.add('setPreferredLanguage', (prefreredLanguage) => {
  cy.url().then(url => {
    if(!url.includes(prefreredLanguage)) { //Switch language if it's not the preferred language
      cy.get('[data-testid="Header__LanguageSwitch"]').should('be.visible').click() 
    }
  })
})

/*
  Command to set almosafer service to be tested.
*/
Cypress.Commands.add('setServiceType', (serviceType) => {
  let serviceTestID;

  if(serviceType == serviceTypes.flights) {
    serviceTestID = "Header__FlightsNavigationTab"
  }
  else if(serviceType == serviceTypes.hotels) {
    serviceTestID = "Header__HotelsNavigationTab"
  }
  else if(serviceType == serviceTypes.chalets) {
    serviceTestID = "Header__ChaletsNavigationTab"
  }

  cy.get('[data-testid="' + serviceTestID + '"]').should('be.visible').click() 
})

/*
  Command to set origin airport randomly
*/
Cypress.Commands.add('setOriginAirportRandomly', () => {
  //Open origin Airport dropdown
  cy.get('[data-testid="FlightSearchBox__FromAirportInput"]', {timeout: 10000}).should('exist').click()
  //Click specified origin airport
  cy.get('[data-testid="AutoCompleteResultsList"]').children().then(($li) => {
    const items = $li.toArray()
    return Cypress._.sample(items)
  })
  .click()
})

/*
  Command to set destination airport randomly
*/
Cypress.Commands.add('setDestinationAirportRandomly', () => {
  //Open origin Airport dropdown
  cy.get('[data-testid="AutoCompleteResultsList"]', {timeout: 10000}).should('not.exist')
  cy.get('[data-testid="FlightSearchBox__ToAirportInput"]', {timeout: 10000}).should('exist').click()
  //Click specified origin airport
  cy.get('[data-testid="AutoCompleteResultsList"]').children().then(($li) => {
    const items = $li.toArray()
    return Cypress._.sample(items)
  })
  .click()
})

/*
  Command to set the date
*/
Cypress.Commands.add('setFlightDateRandomly',() => {

  //Randomize the Date
  let currentDate = (new Date()).getTime();
  let newDate = new Date(currentDate + parseInt(Math.random() * 1000 * 60 * 60 * 24 * 365));

  let day= newDate.getDate()
  let month= newDate.getMonth()
  let year= newDate.getFullYear()

  // Departure DATE PICKER
  cy.get('[data-testid="FlightSearchBox__FromDateButton"]').click()

  // Select Year
  cy.get('[data-testid="FlightSearchCalendar__YearDropdown"]')
    .first()
    .select(year.toString())

  //Select Month
  cy.get('[data-testid="FlightSearchCalendar__MonthDropdown"]')
    .first()
    .select(month.toString())

  //Select Day
  cy.get('.DayPicker-Body')
    .contains(day)
    .click()

  // Return DATE PICKER
  cy.get('[data-testid="FlightSearchBox__ToDateButton"]').click()

  currentDate = Date(newDate)
  newDate = new Date(currentDate + parseInt(Math.random() * 1000 * 60 * 60 * 24 * 365));

  // Select Year
  cy.get('[data-testid="FlightSearchCalendar__YearDropdown"]')
    .first()
    .select(year.toString())

  //Select Month
  cy.get('[data-testid="FlightSearchCalendar__MonthDropdown"]')
    .first()
    .select(month)

  //Select FromDay
  cy.get('.DayPicker-Body')
    .contains(day)
    .click()
})

/*
  Command to set the cabin type (economy, business, etc.)
*/
Cypress.Commands.add('setCabinType', (cabinType) => {
  //Expand Cabin Type dropdown
  cy.get('[data-testid="FlightSearchBox__CabinTypeDropdown"]').click()

  if(cabinType == cabinTypes.economy){
    cy.get('[data-testid="FlightSearchCabinSelection__EconomyOption"]',{ timeout: 10000 }).should('be.visible').click()
  }
  else if(cabinType == cabinTypes.premiumEconomy){
    cy.get('[data-testid="FlightSearchCabinSelection__PremiumEconomyOption"]',{ timeout: 10000 }).should('be.visible').click()
  }
  else if(cabinType == cabinTypes.business){
    cy.get('[data-testid="FlightSearchCabinSelection__BusinessOption"]',{ timeout: 10000 }).should('be.visible').click()
  }
  else if(cabinType == cabinTypes.first){
    cy.get('[data-testid="FlightSearchCabinSelection__FirstOption"]',{ timeout: 10000 }).should('be.visible').click()
  }

})

/*
  Command to set the passender PAX
*/
Cypress.Commands.add('setPassengers',(adultPAX, childPAX, infantPAX) => {

  //Expand Passenger dropdown
  cy.get('[data-testid="FlightSearchBox__PaxDropdown"]').click()

  if(adultPAX==0){
    expect(true).to.equal(false).log('Unaccepted Value for Adults')
  }else if(adultPAX==1){
    cy.get('[data-testid="FlightSearchBox__PaxDropdown"]').should('contain','1')
  } else{
    for(let i=0;i<adultPAX-1;i++){
      cy.get('[data-testid="FlightSearchPAXSelection__AdultsPlusButton"]').click()
    }
  }

  if(childPAX > 0 && childPAX < 8){
    for(let i=0; i<childPAX ;i++ ){
      cy.get('[data-testid="FlightSearchPAXSelection__ChildrenPlusButton"]',{timeout:5000}).click()
    }
  }

  if(infantPAX > 0){
    for(let i=0; i<infantPAX ;i++){
      cy.get('[data-testid="FlightSearchPAXSelection__InfantsPlusButton"]').click()
    }
  }

})

/*
  Command to submit flight search query and await transition to next page
*/
Cypress.Commands.add('submitSearchQuery', () => {
  cy.intercept(/.*\/flights(?:\/.*)?/).as('secondPage')
  cy.get('[data-testid="FlightSearchBox__SearchButton"]').first().click()
  cy.wait('@secondPage', { timeout: 10000 })
})

/*
  Command to close search page modal
*/
Cypress.Commands.add('removeInsuranceModal',() => {
  cy.get('body').then($body => {
    if($body.find('.Modal__BodyContainer').length > 0) {
      cy.get('.Modal__BodyContainer').find('button').click({force: true})
    }
  })
})

/*
  Command to await search load
*/
Cypress.Commands.add('awaitSearchLoad',() => {
  cy.get('[data-testid="FlightSearchResults__ProgressBar__finished"]', {timeout: 30000}).should('exist')
})

/*
  Command to set sort option (cheapest, best value, shortest)
*/
Cypress.Commands.add('setSortOption',(sortOption) => {
  if(sortOption == sortOptions.cheapest){
    cy.get('[data-testid="Cheapest__SortBy__selected"]').should('be.visible').click()
  }
  else if(sortOption == sortOptions.bestValue){
    cy.get('[data-testid="Best__SortBy"]').should('be.visible').click()
  }
  else if(sortOption == sortOptions.shortest){
    cy.get('[data-testid="Shortest__SortBy"]').should('be.visible').click()
  }
})

/*
  Command to expand price range filter
*/
Cypress.Commands.add('expandPriceRangeFilter',() => {
  cy.get('[data-testid="Collapsed_PriceFilter"]').click()
})




