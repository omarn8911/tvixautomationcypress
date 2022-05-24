/// <reference types="cypress" />

// Search cars test for tvixautomationchallenge web page

describe('Given a user is in the webpage for searching cars', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('WHEN he selects the search parameters THEN the results are shown', () => {
    //
    cy.get('#country').select('Poland')
    cy.get('#city').select('Cracow')
    cy.get('#pickup').type('2022-05-16')
    cy.get('#dropoff').type('2022-05-17')
    cy.get('.btn').click();
    cy.get('.table').should('be.visible') //asserts that the table is displayed
    //Now we're going to asset column names:
    cy.get('thead > tr > :nth-child(1)').should('have.text','#')
    cy.get('thead > tr > :nth-child(2)').should('have.text','Company')
    cy.get('thead > tr > :nth-child(3)').should('have.text','Model')
    cy.get('thead > tr > :nth-child(4)').should('have.text','License plate')
    cy.get('thead > tr > :nth-child(5)').should('have.text','Price')
    cy.get('thead > tr > :nth-child(6)').should('have.text','Price per day')
    cy.get('thead > tr > :nth-child(7)').should('have.text','Action')
    cy.get('a.btn.btn-success').each(($el, index, $list)=>{
      const btnText = $el.text();
      expect(btnText).to.equal('Rent')
    })
  })

  it('WHEN the Rent button is clicked THEN the user is redirected to the confirmation page', () => {

    cy.getCarInfo()
    cy.get(':nth-child(1) > :nth-child(7) > .btn').should('have.attr', 'href').and('to.be.equal', '/details/4')
    cy.get(':nth-child(1) > :nth-child(7) > .btn').click()
    cy.url().should('to.be.equal', 'http://qalab.pl.tivixlabs.com/details/4')
    //next comand will get details from results page
    // //next comands will compare obtained details againts the current details on confirmation page
    cy.get('@company').then(company => 
      cy.get('.card-title').should('have.text','Company: '+company))
    cy.get('@model').then(model => 
      cy.get('.card-header').should('contain',model)) //not using have.text for this one, cause the texta has some spaces and \n
    cy.get('@licensePlate').then(licensePlate => 
      cy.get('.card-body > :nth-child(4)').should('have.text','License plate: '+licensePlate))
    cy.get('@pickupDate').then(pickupDate => 
      cy.get('.card-body > :nth-child(5)').should('have.text',' Pickup date: '+pickupDate))
    cy.get('@dropOffDate').then(dropOffDate => 
      cy.get('.card-body > :nth-child(6)').should('have.text',' Dropoff date: '+dropOffDate))
    cy.get('.btn').should('have.text', 'Rent!')
    })

    it('WHEN the Rent! button is clicked the user gets redirected to the rent page that asks for client data', () => {
      
      cy.getCarInfo()
      cy.get(':nth-child(1) > :nth-child(7) > .btn').click()
      //I repeated the complete process above to get to the results page, because for some reason when you go direct tu the details page the Rent button is missing.
      cy.url().should('to.be.equal', 'http://qalab.pl.tivixlabs.com/details/4')
      cy.getLocation()
      cy.get('.btn').click()
      cy.url().should('to.be.equal', 'http://qalab.pl.tivixlabs.com/rent/4')
      //validating final confirmed values for the rent
      cy.get('@company').then(company => 
        cy.get('.card-title').should('have.text','Company: '+company))
      cy.get('@pricePerDay').then(pricePerDay =>
        cy.get('.col-md-4 > :nth-child(3)').should('have.text','Price per day: '+pricePerDay))
      cy.get('@location').then(location =>
        cy.get('.col-md-4 > :nth-child(4)').should('have.text',location))
      cy.get('@licensePlate').then(licensePlate => 
        cy.get('.col-md-4 > :nth-child(5)').should('have.text','License plate: '+licensePlate))
      cy.get('@pickupDate').then(pickupDate => 
        cy.get('.col-md-4 > :nth-child(6)').should('have.text',' Pickup date: '+pickupDate))
      cy.get('@dropOffDate').then(dropOffDate => 
        cy.get('.col-md-4 > :nth-child(7)').should('have.text',' Dropoff date: '+dropOffDate))
      cy.get('.btn').should('have.text', 'Rent')
      //validating from asking for personal data
      cy.get('#name').invoke('attr','placeholder').should('be.equal', 'Name')
      cy.get('#last_name').invoke('attr','placeholder').should('be.equal', 'Last name')
      cy.get('#card_number').invoke('attr','placeholder').should('be.equal', 'Card number')
      cy.get('#email').invoke('attr','placeholder').should('be.equal', 'Email')
      //entering data to the form
      cy.get('#name').type('Omar Andrés')
      cy.get('#last_name').type('Narváez Ortega')
      cy.get('#card_number').type('1065881015')
      cy.get('#email').type('omarandres.narvaez@gmail.com')
      //Now, We're ready to click the Rent button, but due to that one is broken at least we're going to control an expect a POST request is called, despite it will fail
      cy.intercept('POST', '/rent/4').as('rentFailed but thats ok') //you will see this ailiasing in the cypress Log letting now this behavior of the Page not found is expected by now
      cy.get('form').submit()

      })

  })

  
