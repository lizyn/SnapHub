describe('Delete a post e2e test', () => {
    it('Delete a post', () => {
        cy.visit("http://localhost:3000/");
        
        cy.get('#username').type('Emily').should('have.value', 'Emily');
        cy.get('#password').type('ASDFasdf1234!').should('have.value', 'ASDFasdf1234!');

        cy.get('#testlogin').contains('Sign In').click();


        cy.get('#homelink').contains('Go to Homepage').click();

        cy.get('#root > div > div.flex1 > div > div.right-section > div.feed > div > div:nth-child(6) > div:nth-child(2) > div > button > img').click();

        cy.get('body > div.MuiModal-root.css-79ws1d-MuiModal-root > div.post-detail-text.MuiBox-root.css-7kiu9g > div.post-detail-right > div:nth-child(3) > button').click();
    })
});