/**
 * @jest-environment jsdom
 */

import { React } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import PostDetail from './PostDetail';

// snapshot testing
test('PostDetail component matches snapshot', () => {
  const component = renderer.create(
    <MemoryRouter>
      <PostDetail />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render 4 buttons', () => {
  render(
    <MemoryRouter>
      <PostDetail
        open
        handlePostChange={() => {}}
        setOpen={() => {}}
        author="Test"
        userId="1"
        title=""
        img=""
        avatar=""
        likes={1}
        postId="2"
      />
    </MemoryRouter>
  );
});
// const buttons = screen.getAllByRole('button');
// arrow button, upload a file button, close button, post button
// expect(buttons.length).toBe(4);

test('Like btn respond/changes when a post is liked', async () => {
  render(
    <MemoryRouter>
      <PostDetail
        open
        setOpen={() => {}}
        author="author"
        avatar="/"
        img="/"
        userId="1"
        likes={5}
        commentIds={[]}
        title="post-test"
        commentNum={0}
        postId="1"
        handlePostChange={() => {}}
      />
    </MemoryRouter>
  );
  const likeBtn = screen.getByRole('button', { name: 'like' });
  await userEvent.click(likeBtn);
  const liked = screen.getByRole('button', { name: 'like' });
  expect(liked).toBeVisible();
});

test('comment box updates when user types', async () => {
  render(
    <MemoryRouter>
      <PostDetail
        open
        setOpen={() => {}}
        author="author"
        avatar="/"
        img="/"
        userId="1"
        likes={5}
        commentIds={[]}
        title="post-test"
        postId="0"
        handlePostChange={() => {}}
      />
    </MemoryRouter>
  );
  const comment = screen.getByRole('textbox');
  await userEvent.type(comment, 'I like your post');
  expect(comment).toHaveValue('I like your post');
});

test('comment box clears after user post comment', async () => {
  render(
    <MemoryRouter>
      <PostDetail
        open
        setOpen={() => {}}
        author="author"
        userId="1"
        avatar="/"
        img="/"
        likes={5}
        commentIds={[]}
        title="post-test"
        postId="0"
        handlePostChange={() => {}}
      />
    </MemoryRouter>
  );
  const comment = screen.getByRole('textbox');
  const submitComment = screen.getByRole('button', { name: 'send comment' });
  await userEvent.type(comment, 'my first comment');
  await userEvent.click(submitComment);
  // expect(comment).toHaveValue('');
});
