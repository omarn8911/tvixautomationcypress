class SearchPage{
    getCarRecord() { 
        //We could go through the UI from main page to filter results, but it's easier an quicker go direct to the results page in this case.
        return cy.get('tbody> :nth-child(1) > td')
    }
    getPickupDate() {
        var pickupDate
        return pickupDate = cy.get('input[type=date][name=pickup]').invoke('attr','value')
    }
    getDropDate() {
        var dropOffDate
        return dropOffDate = cy.get('input[type=date][name=dropoff').invoke('attr','value')
    }

}

export default SearchPage;
