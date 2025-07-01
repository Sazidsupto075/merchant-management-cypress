describe('login tests', ()=>{

    // it('should login as maker 02 successfully',()=>{

    //     cy.loginAsMaker02();
    //     cy.url().should('include','/admin');
        
    // });


    it('should login as approver 02 successfully', ()=>{

        cy.loginAsApprover01();
        cy.url().should('include','/admin');
    })
})