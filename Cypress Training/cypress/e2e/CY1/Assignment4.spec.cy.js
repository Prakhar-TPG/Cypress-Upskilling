/// <reference types="cypress" />
describe("My First Cypress Test", function () {

    beforeEach(function () {
        cy.fixture('Signup_page.json').then(function (mydata) {
            this.mydata = mydata
        })
        cy.open_automation_exercise_website()
})

    it('sign up and register', function () {

        cy.get(this.mydata.Signin_button).click()
        cy.New_signup_user(this.mydata)
        cy.get("#form").children().children().children(".col-sm-4").children(".login-form").children().should('contain', this.mydata.message_verification_text[4])                            
        
        for (let i = 0; i < this.mydata.DateOfBirth.length; i++) {
            cy.fill_dropdownform(this.mydata.DateOfBirth[i], this.mydata.DateOfBirth_value[i])                            
        }
        for (let i = 0; i < this.mydata.PersonalDetails_loc.length; i++) {
            cy.fill_user_information(this.mydata.PersonalDetails_loc[i], this.mydata.PersonalDetails_data[i])                            
        }
        for (let i = 0; i < this.mydata.checkbox.length; i++) {
            cy.newsletter_and_offers_signup(this.mydata.checkbox[i])
        }
        cy.get(this.mydata.create_account_button).click()
        cy.get(this.mydata.account_created_loc).should('contain', this.mydata.message_verification_text[5])
        cy.get(this.mydata.continue_btn).click()
        cy.Username_verification() 
        cy.Deleting_the_account(this.mydata)                           

    })                        

    it('Log in with correct email and password', function () {

        cy.get(this.mydata.Signin_button).click()
        cy.New_signup_user(this.mydata)
        const passcode= this.mydata.PersonalDetails_data[2]
        for (let i = 0; i < this.mydata.DateOfBirth.length; i++) {
            cy.fill_dropdownform(this.mydata.DateOfBirth[i], this.mydata.DateOfBirth_value[i])                            
        }
        for (let i = 0; i < this.mydata.PersonalDetails_loc.length; i++) {
            cy.fill_user_information(this.mydata.PersonalDetails_loc[i], this.mydata.PersonalDetails_data[i])                            
        }
        for (let i = 0; i < this.mydata.checkbox.length; i++) {
            cy.newsletter_and_offers_signup(this.mydata.checkbox[i])
        }
        cy.get(this.mydata.create_account_button).click()
        cy.get(this.mydata.account_created_loc).should('contain', this.mydata.message_verification_text[5])
        cy.get(this.mydata.continue_btn).click()
        cy.get(this.mydata.Logout_button).click()
        cy.get(this.mydata.Signin_button).click()                
        cy.get(this.mydata.login_password).type(passcode)
        cy.login(this.mydata,1) 
        cy.Username_verification()
        cy.Deleting_the_account(this.mydata)                           
                            
    })

    it('Log in with incorrect email and password', function () {

        cy.get(this.mydata.Signin_button).click()
        cy.incorrect_credentials(this.mydata)                             
    })

    it('Logout User', function () {

        cy.get(this.mydata.Signin_button).click()
        cy.login(this.mydata) 
        cy.get(this.mydata.Logout_button).click()
        cy.get("#form").children().children().children(".col-sm-4").children(".login-form").should('contain', this.mydata.message_verification_text[6])                            

    })

    it('Register User with existing email', function () {

        cy.get(this.mydata.Signin_button).click()
        cy.verifying_user_already_exist(this.mydata)
    })
})
