// cypress/component/BooksList.cy.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../src/app/store'; // ✅ adjust path if needed
import BooksList from '../../src/features/books/BooksList'; // ✅ adjust path if needed

describe('BooksList', () => {
  beforeEach(() => {
    cy.mount(
      <Provider store={store}>
        <BooksList />
      </Provider>
    );
  });

  it('should render the header with title "Books List"', () => {
    cy.get('h1').should('contain', 'Books List');
  });
});
