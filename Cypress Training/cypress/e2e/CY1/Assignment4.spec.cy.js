/// <reference types="cypress" />
describe("My First Cypress Test", function () {

    beforeEach(function () {
        cy.fixture('Signup_page.json').then(function (mydata) {
            this.mydata = mydata
        })
        cy.fixture('automation_homepage.json').then(function (homepage) {
            this.homepage = homepage
        })
        cy.open_aotomation_exercise_website()
})

    it('sign up and register', function () {

        cy.Signin_button(this.mydata)
        cy.New_signup_user(this.mydata)
        cy.get(".login-form>h2>b").should('contain', "Enter Account Information")
        
        for (let i = 0; i < this.mydata.dropdown.length; i++) {
            cy.fill_dropdownform(this.mydata.dropdown[i], this.mydata.dropdown_text[i])                            
        }
        for (let i = 0; i < this.mydata.form.length; i++) {
            cy.fill_user_information(this.mydata.form[i], this.mydata.formdata[i])                            
        }
        for (let i = 0; i < this.mydata.checkbox.length; i++) {
            cy.newsletter_and_offers_signup(this.mydata.checkbox[i])
        }
        cy.get(this.homepage.create_account_button).click()
        cy.get(this.mydata.account_created_loc).should('contain', "Account Created!")
        cy.get(this.homepage.continue_btn).click()
        cy.Username_verification() 
        cy.Deleting_the_account(this.mydata)                           

    })                        

    it('Log in with correct email and password', function () {

        cy.Signin_button(this.mydata)
        cy.login(this.mydata) 
        cy.Username_verification()                            
    })

    it('Log in with incorrect email and password', function () {

        cy.Signin_button(this.mydata)
        cy.incorrect_credentials(this.mydata)                             
    })

    it('Logout User', function () {

        cy.Signin_button(this.mydata)
        cy.login(this.mydata) 
        cy.logout_button(this.mydata)
        cy.get(".login-form>h2").should('contain', "Login to your account")                            
    })

    it('Register User with existing email', function () {

        cy.Signin_button(this.mydata)
        cy.verifying_user_already_exist(this.mydata)
    })
})