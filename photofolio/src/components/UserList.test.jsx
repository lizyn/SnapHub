/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import UserList from './UserList';
// import userEvent from '@testing-library/user-event';

test('render 6 userrows', () => {
  const { container } = render(
    <MemoryRouter>
      <UserList />
    </MemoryRouter>
  );
  expect(container.getElementsByClassName('user-row-card').length).toBe(6);
});
