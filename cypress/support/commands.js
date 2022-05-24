//import SearchPage object model, so we can use the values of our car to make assertions through the test cases
import SearchPage from '../integration/pageObjects/SearchPage';
import DetailsPage from '../integration/pageObjects/DetailsPage';

Cypress.Commands.add('getCarInfo', () => {
    const searchPage = new SearchPage();
    cy.visit('http://qalab.pl.tivixlabs.com/?country=3&city=3&model=&pickup=2022-05-17&dropoff=2022-05-18')
    searchPage.getCarRecord().each(($el, index)=>{
        
        switch(index){
            case 0:
                cy.wrap($el.text()).as('company')
              break;
            case 1:
                cy.wrap($el.text()).as('model')
              break;
           case 2: 
                cy.wrap($el.text()).as('licensePlate')
             break;
           case 3:
                cy.wrap($el.text()).as('price')
             break;
           case 4: 
                cy.wrap($el.text()).as('pricePerDay')
             break;
           default:
             break;
           }
    })
    searchPage.getPickupDate().then(pickupDate => {
        cy.wrap(pickupDate).as('pickupDate')
    })

    searchPage.getDropDate().then(dropOffDate => {
        cy.wrap(dropOffDate).as('dropOffDate')
    })
        
})

Cypress.Commands.add('getLocation',()=>{ 
    const detailsPage = new DetailsPage();
    detailsPage.getCards().each(($el, index)=>{
        
        switch(index){
            case 1:
                cy.wrap($el.text()).as('location')
              break;
           default:
             break;
           }
    })
})


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


