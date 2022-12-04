/// <reference types="cypress" />
describe("CY Assignment 3", function () {

    beforeEach(function () {
        cy.fixture('mylocator.json').then(function (mylocator) {
            this.mylocator = mylocator
        })
        cy.fixture('Homepage_loc.json').then(function (homloc) {
            this.homloc = homloc
        })
        cy.fixture('user.json').then(function (data) {
            this.data = data
        })
        cy.fixture('CartPage_loc.json').then(function (cartloc) {
            this.cartloc = cartloc
        })
        cy.fixture('Flightpage_loc.json').then(function (flight_loc) {
            this.flight_loc = flight_loc
        })
        cy.fixture('Flightdata.json').then(function (flightdata) {
            this.flightdata = flightdata
        })
        cy.open_Spicejet_website()
        cy.viewport(1024, 635)

    })

    it.only("Roundtrip flight", function () {

        cy.selecting_the_flight_location(this.mylocator,this.flightdata)
        cy.fetch_source_and_destination(this.mylocator)
        cy.Select_from_date(this.mylocator)
        cy.get(this.mylocator.To_date_loc).eq(1).click()
        cy.Select_to_date(this.mylocator)
        cy.special_benifts(this.mylocator)
        cy.fetch_from_date(this.mylocator)
        cy.fetch_to_date(this.mylocator)
        cy.No_of_passengers(this.mylocator)
        cy.buttons_to_proceed_to_flightpage(this.mylocator)
        cy.verifying_details_on_flightpage(this.flight_loc)
        cy.Count_Departure_flights(this.flight_loc)
        cy.Count_Returning_flights(this.flight_loc)
    })

    it("Oneway flight", function () {
        
        cy.selecting_the_flight_location(this.mylocator,this.flightdata)
        cy.fetch_source_and_destination(this.mylocator)
        cy.Select_from_date(this.mylocator)
        // cy.special_benifts(this.mylocator)
        cy.fetch_from_date(this.mylocator)
        cy.No_of_passengers(this.mylocator)
        // cy.buttons_to_proceed_to_flightpage(this.mylocator)
        cy.get(this.mylocator.Search_flight_button_loc).click();
        cy.verifying_details_on_flightpage(this.flight_loc)
        cy.Count_Departure_flights(this.flight_loc)
    })    
})