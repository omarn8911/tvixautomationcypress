class DetailsPage{
    getCards() { 
        return cy.get('p.card-text')
    }

}

export default DetailsPage;
