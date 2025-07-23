import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../src/app/store'; // ✅ This path is correct based on your structure
import BooksList from '../../src/features/books/BooksList'; // ✅ Your component path

describe('BooksList', () => {
  beforeEach(() => {
    cy.mount(
      <Provider store={store}>
        <BooksList />
      </Provider>
    );
  });

  it('should render the header with title "Books List"', () => {
    cy.contains('Books List');
  });
});
