/**
 * @jest-environment jsdom
 */

import React from 'react';
// import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Switch } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

import UserRow from './UserRow';

// snapshot testing
test('Post Modal matches snapshot', () => {
  const component = renderer.create(
    <MemoryRouter>
      <UserRow avatar="" name="" userId="1" showFollow />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders component with Follow button', () => {
  render(
    <MemoryRouter>
      <UserRow avatar="" name="" userId="1" showFollow />
    </MemoryRouter>
  );
  const followBtn = screen.getByText(/follow/);
  expect(followBtn).toBeInTheDocument();
});

test('without Follow button', () => {
  render(
    <MemoryRouter>
      <UserRow avatar="" name="" userId="1" />
    </MemoryRouter>
  );
  const followBtn = screen.queryByText(/follow/);
  expect(followBtn).not.toBeInTheDocument();
});

it('test', async () => {
  render(
    <MemoryRouter>
      <UserRow avatar="avatar" name="name" userId="1" showFollow />
    </MemoryRouter>
  );
  // manually trigger the callback
  const followBtn = screen.getByRole('button', { name: 'follow' });
  userEvent.click(followBtn);
  const unfollowBtn = screen.getByRole('button', { name: 'followed' });
  userEvent.click(unfollowBtn);
});
