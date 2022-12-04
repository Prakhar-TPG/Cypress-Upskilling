/// <reference types="cypress" />
describe("CY Assignment 2", function () {

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
        cy.open_saucedemo_website()

    })

    it("add product to cart", function () {

        cy.loginPage(this.mylocator.username_loc, this.data.Valid_user[0].name, this.mylocator.password_loc, this.data.Valid_user[0].password, this.mylocator.login_button_loc)
        cy.addproduct_to_cart(this.homloc, this.cartloc)
        cy.VerifyProduct_is_added_to_cart(this.homloc, this.cartloc)
    })

    it("remove from cart", function () {

        cy.loginPage(this.mylocator.username_loc, this.data.Valid_user[0].name, this.mylocator.password_loc, this.data.Valid_user[0].password, this.mylocator.login_button_loc)
        cy.addproduct_to_cart(this.homloc, this.cartloc)
        cy.VerifyProduct_is_removed_from_Cart(this.cartloc, this.homloc)
    })
})