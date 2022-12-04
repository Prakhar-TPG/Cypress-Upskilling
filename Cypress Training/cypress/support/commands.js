// const dayjs = require('dayjs')
import moment from 'moment';

// ---------- Assignment on saucedemo website -----------
Cypress.Commands.add('loginPage', (username_loc, name, password_loc, password, login_button_loc) => {
    cy.get(username_loc).type(name);
    cy.get(password_loc).type(password);
    cy.get(login_button_loc).click();
})

Cypress.Commands.add('open_saucedemo_website', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.url().should('include', 'https://www.saucedemo.com/')
})

Cypress.Commands.add('user_validation', (mylocator) => {
    cy.get(mylocator.valid_message).invoke('text')
        .should((text1) => {
            expect(text1).contains("Epic sadface: Username and password do not match any user in this service")
        })
})

Cypress.Commands.add('logout', (mylocator) => {
    cy.get(mylocator.hamburger_icon).click();
    cy.get(mylocator.logout_button).should('contain', mylocator.Logout_name).click();
})

Cypress.Commands.add('addproduct_to_cart', (Homepage_loc, CartPage_loc) => {
    
    cy.get(Homepage_loc.add_to_cart_button).each(($button,index, $list) => {
    cy.wrap($button).click()
    expect(index).to.be.greaterThan(-1);
    expect($list).to.have.length(6);
    })
        cy.get(CartPage_loc.cart_button).click();
})

Cypress.Commands.add('VerifyProduct_is_added_to_cart', (Homepage_loc, CartPage_loc) => {
    
    cy.get(Homepage_loc.product_name_loc).invoke('text').then(text3 => {
    const productname = text3;
    cy.get(Homepage_loc.product_price_loc).invoke('text').then(text4 => {
    const productprice = text4;

    cy.get(CartPage_loc.cartproduct_name_loc).invoke('text').then(text5 => {
    const productname_in_cart = text5;
    cy.get(CartPage_loc.cartproduct_price_loc).invoke('text').then(text6 => {
    const productprice_in_cart = text6;

    expect(productname).to.equal(productname_in_cart)
    expect(productprice).to.equal(productprice_in_cart)

    })
    })
    })
})
})

Cypress.Commands.add('VerifyProduct_is_removed_from_Cart', (CartPage_loc, Homepage_loc) => {

    cy.get(CartPage_loc.continue_shopping_button).click();
    cy.get(Homepage_loc.remove_button).each(($button,index, $list) => {
    cy.wrap($button).click()
    expect(index).to.be.greaterThan(-1);
    expect($list).to.have.length(6);
    })
    cy.get(CartPage_loc.cart_button).click();
    cy.get(CartPage_loc.cartproduct_name_loc).should('not.exist');
})

// ---------- Assignment on Spicejet website -----------

Cypress.Commands.add('open_Spicejet_website', () => {
    cy.visit('https://www.spicejet.com/');
    cy.url().should('include', 'https://www.spicejet.com/')
})

var Origin_city,Return_city,Travellers_selected,Destination_city,Departure_city,From_date,Departure_date,To_date,return_Date,Travellers_check_in_flight

Cypress.Commands.add('selecting_the_flight_location', (mylocator,flightdata) => {

    cy.wait(2000)
    cy
    .get(mylocator.Origin_city_loc).eq(0).type(flightdata.Source).wait(1000) 
    .get(mylocator.Origin_city_Dropdown_loc).contains("Bengaluru").click();     //selecting the Source city flight
    cy.wait(1000)
    
    cy
    .get(mylocator.Departure_city_loc).eq(1).type(flightdata.Destination)
    .get(mylocator.Departure_city_Dropdown_loc).contains("Ahmedabad").click();  //selecting the Destination city flight
    cy.wait(1000)
})

Cypress.Commands.add('fetch_source_and_destination', (mylocator) => {       //Fetching the text of Source city
    cy.get(mylocator.Origin_city_loc).eq(0).invoke('attr', 'value').then(text4 => {
        Origin_city = text4.split(' ')[0];
    })
    cy.get(mylocator.Departure_city_loc).eq(1).invoke('attr', 'value').then(text4 => {      //Fetching the text of Destination city
        Destination_city = text4.split(' ')[0];
    })
})
    
Cypress.Commands.add('Select_from_date', (mylocator) => {       //selecting the "from" date of the flight  

    const day = moment().add(8,'day').format('D');
    const month = moment().format('MMMM');
    const year = moment().format('YYYY'); 

    cy
    .get(mylocator.month).invoke('attr', 'data-testid',`undefined-month-${month}-${year}`)
    .find(mylocator.Date).children().children().children().contains(`${day}`).click()
})

Cypress.Commands.add('Select_to_date', (mylocator) => {     //selecting "to" date of the flight 

    const day = moment().add(10,'day').format('D');
    const month = moment().format('MMMM');
    const year = moment().format('YYYY');

    cy
    .get(mylocator.month).invoke('attr', 'data-testid',`undefined-month-${month}-${year}`)
    .get('.css-76zvg2.r-homxoj.r-ubezar.r-16dba41').contains(`${day}`).click()
})  

Cypress.Commands.add('No_of_passengers', (mylocator) => {       //fetching the text of number of passengers
    cy.get(mylocator.No_of_travellers_loc).eq(2).invoke('text').then(text4=>{
        Travellers_selected= text4;
        cy.log(Travellers_selected);
    })
})

Cypress.Commands.add('fetch_from_date', (mylocator) => {        //fetching "from" date of the flight 
    cy.get(mylocator.From_date_loc).eq(0).invoke('text').then(text4=>{
        From_date= text4;
        cy.log(From_date)
    })
})

Cypress.Commands.add('fetch_to_date', (mylocator) => {      //fetching "to" date of the flight 
    cy.get(mylocator.To_date_loc).eq(1).invoke('text').then(text4=>{
        To_date= text4;
        cy.log(To_date)
    })
})

Cypress.Commands.add('special_benifts', (mylocator) => {        //selecting the sprcial quota 

    cy.get(mylocator.Special_quota_loc).eq(2).click() 
})

Cypress.Commands.add('buttons_to_proceed_to_flightpage', (mylocator) => {

    cy.get(mylocator.Currency_loc).eq(3).contains("INR")
    cy.get(mylocator.Search_flight_button_loc).click();
    cy.get(mylocator.Terms_and_Conditions_loc).click();
    cy.get(mylocator.Continue_btn_loc).click();
})

Cypress.Commands.add('verifying_details_on_flightpage', (Flightpage_loc) => {       //verifying the details between the homepage and serached flightpage page
    
    // Cypress.Commands.add('verifyLink', (dataObject) => {
        // var dataObject = {
        //     From_date: Departure_date,
        //     To_date: return_Date,
        //   };
    //     //   cy.log(dataObject)
        
        // for (let i = 0; i < (dataObject).length; i++) {
        //   cy.contains(dataObject[i], Object.keys(dataObject)[i])
        //   cy.log(dataObject[i]) 
        //   }

    cy.get(Flightpage_loc.Return_check_loc).eq(1).invoke('text').then(text4 => {
    Return_city = text4.split(' ')[5];
    
    cy.get(Flightpage_loc.Destination_check_loc).eq(0).invoke('text').then(text5 => {
    Departure_city = text5.split(' ')[4];

    cy.get(Flightpage_loc.Departure_date_check_loc).eq(0).invoke('text').then(text6 => {
    Departure_date = text6
    cy.log(Departure_date)
        
    cy.get(Flightpage_loc.Return_date_check_loc).eq(1).invoke('text').then(text7 => {
    return_Date = text7;
    cy.log(return_Date)

    cy.get(Flightpage_loc.Passengers_in_flight).invoke('text').then(text8 => {
    Travellers_check_in_flight = text8;
        
    expect(Origin_city).to.equal(Return_city)
    expect(Destination_city).to.equal(Departure_city)

    expect(From_date).to.equal(Departure_date)
    expect(To_date).to.equal(return_Date)

    expect(Travellers_selected).to.equal(Travellers_check_in_flight)
        
        })
        })
    })
    })   
})
})

Cypress.Commands.add('Count_Departure_flights', (Flightpage_loc) => {       //Count the number of flight from Source city to Destination city
    cy.get(Flightpage_loc.Flights_in_number).eq(0).find('.css-1dbjc4n.r-13awgt0.r-18u37iz.r-b5h31w.r-1ah4tor.r-tvv088').then(listing => {
    const listingCount = Cypress.$(listing).length;
    cy.log("Number of ongoing flights from"+ " "+Origin_city+" = "+listingCount)  
    })      
})

Cypress.Commands.add('Count_Returning_flights', (Flightpage_loc) => {       //Count the number of flight from Destination city to Source city
    cy.get(Flightpage_loc.Flights_in_number).eq(1).find('.css-1dbjc4n.r-13awgt0.r-18u37iz.r-b5h31w.r-1ah4tor.r-tvv088').then(listing => {
    const listingCount = Cypress.$(listing).length;
    cy.log("Number of returning flights from "+" "+Destination_city+" = "+listingCount)
    })
})
