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

Cypress.Commands.add('selecting_the_flight_location', (mylocator,flightdata) => {
    //selecting the Source city flight
    cy.wait(2000)
    cy
    .get(mylocator.Origin_city_loc).type(flightdata.Source_shortName).wait(2000)
    .children(":nth-child(2)").children(":nth-child(2)").children(":nth-child(2)").children(":nth-child(2)").children(":nth-child(2)").children().children(":nth-child(1)").contains(flightdata.SourceCity).click();
    
    //selecting the Destination city flight
    cy.wait(2000)
    cy
    .get(mylocator.Departure_city_loc).type(flightdata.Destination_shortName)
    .children(":nth-child(2)").children(":nth-child(2)").children(":nth-child(2)").children(":nth-child(2)").children(":nth-child(2)").children().children(":nth-child(1)").contains(flightdata.DestinationCity).click();  
    cy.wait(1000)
})

//selecting the special quota for types of passenegers 
Cypress.Commands.add('special_benefits', (mylocator) => {         

    cy.get(mylocator.Special_quota_loc).eq(2).click() 
})

//Buttons to proceed to Flightpage
Cypress.Commands.add('buttons_to_proceed_to_flightpage', (mylocator) => {

    cy.get(mylocator.Search_flight_button_loc).click();
    cy.get(mylocator.Terms_and_Conditions_loc).click();
    cy.get(mylocator.Continue_btn_loc).click();
})

//Verifying all the flight information
Cypress.Commands.add('verifying_flightpage_information', (Flightpage_loc,flightdata,fromDate,toDate,roundtrip) => {       //verifying the details between the homepage and serached flightpage page
    
    cy.get(Flightpage_loc.FromAndTo_city_loc).eq(0).should('contain',flightdata.SourceCity).and('contain',flightdata.DestinationCity)
    cy.get(Flightpage_loc.no_of_pax).should('contain',flightdata.Adult)
    cy.get(Flightpage_loc.Departure_date_check_loc).eq(0).should('contain',fromDate)
    if(roundtrip==2){
    cy.get(Flightpage_loc.Return_date_check_loc).eq(1).should('contain',toDate)
    }
})

//Counting the number of Departure Flights
Cypress.Commands.add('Count_Departure_flights', (Flightpage_loc,flightdata) => {       //Count the number of flight from Source city to Destination city
    cy.get(Flightpage_loc.OngoingFlights_loc).children(Flightpage_loc.particular_child).find(Flightpage_loc.particular_div).then(listing => {
    const listingCount = Cypress.$(listing).length;
    cy.log("Number of ongoing flights from"+ " "+flightdata.SourceCity+" = "+listingCount)  
    })      
})

//Counting the number of Returning Flights
Cypress.Commands.add('Count_Returning_flights', (Flightpage_loc,flightdata) => {       //Count the number of flight from Destination city to Source city
    cy.get(Flightpage_loc.ReturningFlights_loc).children(Flightpage_loc.particularChild).find(Flightpage_loc.particular_div).then(listing => {
    const listingCount = Cypress.$(listing).length;
    cy.log("Number of returning flights from "+" "+flightdata.DestinationCity+" = "+listingCount)
    })
})

// ---------- Assignment on Automtion exercise website -----------

Cypress.Commands.add('open_aotomation_exercise_website', () => {
    cy.visit('https://automationexercise.com/');
    cy.url().should('include','https://automationexercise.com/')
})

Cypress.Commands.add('Signin_button', (Signup_page) => {    
    cy.get(Signup_page.sign_in).click()                   
})

Cypress.Commands.add('logout_button', (Signup_page) => {    
    cy.get(Signup_page.sign_in).click()                   
})

Cypress.Commands.add('New_signup_user', (Signup_page) => {
    
    cy.get(".signup-form>h2").should('contain', "New User Signup!")
    const username = 'Shivam';
    const result = Math.random().toString(36).substring(2, 7) + '@asdfgh.com';
    cy.get(Signup_page.name).type(username)
    cy.get(Signup_page.new_email).type(result)
    cy.get(Signup_page.Signup_button).click()

})

Cypress.Commands.add('fill_dropdownform', (dropdown,dropdown_text) => {
    
    cy.get(dropdown).select(dropdown_text)
})

Cypress.Commands.add('fill_user_information', (form,formdata) => {
    
    cy.get(form).type(formdata) 
})

Cypress.Commands.add('newsletter_and_offers_signup', (checkbox) => {
    
    cy.get(checkbox).click() 
})

Cypress.Commands.add('login', (Signup_page ) => {  
    cy.get(Signup_page.login_email).type("6ke72@stwyscn.com"),                 
    cy.get(Signup_page.login_password).type("qwerty"),                        
    cy.get(Signup_page.login_button).click();                               
    // cy.get(".navbar-nav>li").last().should('have.text', " Logged in as Shivam")
    // cy.get(".fa-trash-o").click()
    // cy.get(".title>b").should('have.text', "Account delated")
})

Cypress.Commands.add('Deleting_the_account', (Signup_page) => {  
    cy.get(Signup_page.delete_account_btn).click()
    cy.get(Signup_page.delete_text_loc).should('have.text', "Account Deleted!")
})


Cypress.Commands.add('Username_verification', () => {  
    cy.get(".navbar-nav>li").last().should('have.text', " Logged in as Shivam")
})

Cypress.Commands.add('incorrect_credentials', (Signup_page) => {  
    cy.get(Signup_page.login_email).type("qwui@stwyscn.com"),                 
    cy.get(Signup_page.login_password).type("qwerty"),                        
    cy.get(Signup_page.login_button).click(); 
    cy.get(".login-form>form>p").should('contain', "Your email or password is incorrect!")                              

})

Cypress.Commands.add('verifying_user_already_exist', (Signup_page) => {  
    cy.get(Signup_page.new_email).type("6ke72@stwyscn.com"),                 
    cy.get(Signup_page.name).type("Shivam")
    cy.get(Signup_page.Signup_button).click()
    cy.get(".signup-form>form>p").should('contain', "Email Address already exist!")

})
