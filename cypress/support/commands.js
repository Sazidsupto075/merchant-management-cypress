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

Cypress.Commands.add('login',(username,password)=>{
    
     cy.visit('https://payment.dummyurl.net');
     
     //Wait for redirect to SSO login domain
     cy.origin('https://payment-account.dummyurl.net',{ args:{username,password} },  ({username,password})=>{

        // cy.location('hostname', {timeout: 10000}).should('include', 'payment-gw-accounts.celloscope.net');
        
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get("button[id='login-btn']").click(); // login button in bangla
     })
     
     

});

// --------- ROLE-BASED SHORTCUTS (using your env keys) ----------

Cypress.Commands.add('loginAsMaker02', ()=>{

    cy.login(Cypress.env('MAKER_02_USERNAME'), Cypress.env('MAKER_02_PASSWORD'));
});


Cypress.Commands.add('loginAsMaker03', ()=>{
    cy.login(Cypress.env('MAKER_03_USERNAME'),Cypress.env('MAKER_03_USERNAME'));
})

Cypress.Commands.add('loginAsApprover01', ()=>{

    cy.login(Cypress.env('APPROVER_01_USERNAME'), Cypress.env('APPROVER_01_PASSWORD'))

})

Cypress.Commands.add('loginAsApprover02', ()=>{

    cy.login(Cypress.env('APPROVER_02_USERNAME'), Cypress.env('APPROVER_02_PASSWORD'))
    
})

// Command for searchText

Cypress.Commands.add('searchMerchant', (searchText)=>{

    
    cy.get('input[formcontrolname="search_text"]', {timeout: 10000})
    .should('be.visible')
    .clear()
    .type(searchText);

    cy.wait(1000); // adjust if table loads slower


});