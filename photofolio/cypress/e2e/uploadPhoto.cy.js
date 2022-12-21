describe('upload photo e2e test', () => {
    it('upload a photo', () => {
        cy.visit("http://3.235.186.182:3000/");
        
        cy.get('#username').type('Emily').should('have.value', 'Emily');
        cy.get('#password').type('ASDFasdf1234!').should('have.value', 'ASDFasdf1234!');

        cy.get('#testlogin').contains('Sign In').click();


        cy.get('#homelink').contains('Go to Homepage').click();

        cy.get('#newposttest').contains('New Post').click();

        cy.get('#post-title').type('This is the e2e test').should('have.value', 'This is the e2e test');

        cy.get('#uploadbutton').click();
        
        //for linux user, delete one backslash for it. (from a windows user, sry about it)
        cy.get('#popup-2 > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-sm-4.MuiGrid-grid-md-7.css-s78e5j-MuiGrid-root > div > div.MuiBox-root.css-6lwiu8 > label').selectFile('.\\cypress\\e2e\\post2.jpg',{force : true});

        cy.get('#submit').click();
    })
});