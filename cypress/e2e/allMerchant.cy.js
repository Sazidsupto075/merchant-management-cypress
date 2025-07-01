/// <reference types="cypress" />


describe('All Merchant- Maker', ()=>{


    beforeEach(()=>{

        cy.loginAsMaker02();
        
        //change to english
        cy.get("img[alt='Expand Menu']").click();
        cy.contains('ENG').click();

         // Navigate to All Merchant

        cy.contains('Merchant Management').click();
        cy.contains('All Merchant').click();

        // Updated URL validation
        cy.url().should('include', '/admin/merchant-management/merchants');
        
        // should display merchant table
        cy.get('table').should('exist');
        cy.get('table tbody tr').should('have.length.gte', 1);

    })

  
    it('should search by Merchant ID, Merchant Name, Email, Mobile Number and Bank Account', ()=>{
        
        //Search Merchant ID


        cy.searchMerchant('MERCH00001');
        cy.get('table tbody tr').should('have.length.gte', 1);
        cy.contains('td','MERCH00001').should('exist');

        //Search by Merchant Name

        cy.searchMerchant('sust')
        
        cy.contains('td', 'sust').should('exist');

        //Search By Email

        cy.searchMerchant('sust@edu')
        
        cy.contains('td', 'sust@edu').should('exist');


        //Search By Mobile Number

        cy.searchMerchant('019111111111')
        
        cy.contains('td', '019111111111').should('exist');

        //Search by Bank Account

        cy.searchMerchant('02000111122230')
      
        cy.contains('td', '02000111122230').should('exist');


    })

 const merchantIdToLock = 'ST097';

// it('should lock a specific record and verify it appears in My Locked Merchant', () => {
//   // Search for specific merchant ID
//   cy.get('input[formcontrolname="search_text"]', { timeout: 10000 })
//     .clear()
//     .type(merchantIdToLock);



//   // Wait for row and lock it (even though icon is reversed)
//   cy.get('table tbody tr', { timeout: 10000 })
//     .should('contain.text', merchantIdToLock);

//   cy.get('table tbody tr').contains('td', merchantIdToLock).parents('tr').as('targetRow');

//   cy.get('@targetRow').within(() => {
//     cy.get('i.anticon-unlock') // Temporarily means it's actually locked
//       .should('exist')
//       .should('not.have.class', 'pointer-events-none')
//       .scrollIntoView()
//       .click({ force: true });
//   });

//   // Navigate to My Locked Merchant
//   cy.contains('Merchant Management').click();
//   cy.contains('My Locked Merchant').click();

//   // Validate locked record appears
//   cy.url().should('include', '/admin/merchant-management/my-locked');
//   cy.get('table tbody tr', { timeout: 10000 }).should('contain.text', merchantIdToLock);
// });



it.skip('should lock a specific merchant using checkbox and verify it appears in My Locked Merchant', () => {
    // Search for specific merchant
    cy.get('input[formcontrolname="search_text"]')
      .clear()
      .type(merchantIdToLock);

    

    // Wait for filtered table result
    cy.get('table tbody tr', { timeout: 10000 })
      .contains('td', merchantIdToLock)
      .parents('tr')
      .within(() => {
        // Check the checkbox to enable Lock button
        cy.get('input[type="checkbox"]').check({ force: true });
      });

    // Click the Lock button (enabled after checkbox is selected)
    cy.contains('button', 'Lock').should('not.be.disabled').click();

    // Navigate to My Locked Merchant
    cy.contains('Merchant Management').click();
    cy.contains('My Locked Merchant').scrollIntoView().click({ force: true });
    

    // Verify the locked merchant is in the list
    cy.url().should('include', '/admin/merchant-management/my-locked-merchants');


    // cy.get('table tbody tr', { timeout: 10000 })
    //   .contains('td', merchantIdToLock)
    //   .should('exist');

  });

 const merchantIdsToLock = ['MERCH00005', 'MERCH00007'];

it.skip('should lock multiple records using checkboxes and Lock button', () => {
  // Search each merchant and select their checkboxes
  merchantIdsToLock.forEach((merchantId) => {
    cy.get('input[formcontrolname="search_text"]').clear().type(merchantId);
    cy.contains('button', 'Search').click();

    cy.get('table tbody tr')
      .contains('td', merchantId)
      .parents('tr')
      .within(() => {
        cy.get('input[type="checkbox"]').check({ force: true });
      });
  });

  // Verify Lock button is now enabled
  cy.contains('button', 'Lock').should('not.be.disabled').click({ force: true });

  // Navigate to My Locked Merchant to verify
  cy.contains('Merchant Management').click();
  cy.contains('My Locked Merchant', { timeout: 10000 }).click({ force: true });

  cy.url().should('include', '/admin/merchant-management/my-locked');

  // Verify locked merchants appear
  merchantIdsToLock.forEach((merchantId) => {
    cy.get('table tbody tr').contains('td', merchantId).should('exist');
  });
});


it('should clear search input and show all merchants when Reset is clicked', ()=>{

  cy.get("input[formcontrolname='search_text']").clear().type("ST097");
  cy.get('table tbody tr').should('have.length.lte', 2);

  //click RESET

  cy.contains('button','Reset').click({force:true});

  // Confirm input is cleared and full table is back

  cy.get("input[formcontrolname='search_text").should('have.value','');
  cy.get('table tbody tr', {timeout :1000}).should('have.length.gte', 5);

})

it('should reset search input and dropdown filters when Reset is clicked', ()=>{

  cy.get("input[formcontrolname='search_text']").clear().type('ST097');

  //select status from dropdown

  cy.get('#filter_status').click();
  cy.get('.ant-select-dropdown .ant-select-item-option-content', { timeout: 10000 })
  .contains('Active')
  .click({ force: true });

  //Confirm filtered results

  cy.get('table tbody tr').should('have.length.lte', 2);

  // Click reset button

  cy.contains('button','Reset').click({force: true});

  //Confirm search input is cleared

  cy.get("input[formcontrolname='search_text']").should('have.value','');

  //Confirm dropdown is cleared

  cy.get('#filter_status').should('contain.text','Select Status');

  // Table should be repopulated

  cy.get('table tbody tr',{timeout: 10000}).should('have.length.gte', 5);
})


it('should navigate to next page if pagination is available', () => {
  cy.get('button.ant-btn-icon-only[disabled]').should('exist'); // Only 1 page → assert it's disabled

  // OR handle conditionally
  cy.get('button.ant-btn-icon-only').then($btns => {
    const nextBtn = $btns.filter((i, el) => el.querySelector('[data-icon="right"]'));
    if (!nextBtn.prop('disabled')) {
      cy.wrap(nextBtn).click();
      cy.get('table tbody tr').should('have.length.gte', 1);
    } else {
      cy.log('Pagination not needed — only one page of data');
    }
  });
});

it('Should open remarks model and close it', ()=>{

  const merchantIdWithRemarks ='BT567'

  //Type into search box and get remarks icon

  cy.get("input[formcontrolname='search_text']").clear().type(merchantIdWithRemarks);

  cy.get('table tbody tr').contains('td',merchantIdWithRemarks).parents('tr').within(()=>{

    cy.get('svg[data-icon="comment"]')
    .should('exist')
    .scrollIntoView()
    .click({force:true});
  })

  cy.get('.ant-modal').should('be.visible');
  cy.get('.ant-modal-body').should('contain.text','Remark');

  //Click the "Close" span inside modal

  cy.get('.ant-modal').should('be.visible').within(()=>{
    cy.contains('span','Close').click();
  });

  //Modal should close
  cy.get('.ant-modal').should('not.exist');

})

it('Click on Add Merchant and navigate to create merchant page', ()=>{

  
  cy.contains('button','Add Merchant').should('be.visible').click({force:true});

  

})












})