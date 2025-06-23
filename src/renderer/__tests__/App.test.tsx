import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

beforeAll(() => {
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);
});

describe('App', () => {
  it('allows the user to add a new task', () => {
    render(<App />);

    // Find the input and button
    const input = screen.getByPlaceholderText(/add a new task/i);
    const button = screen.getByRole('button', { name: /add/i });

    // Type a new task and click add
    fireEvent.change(input, { target: { value: 'Test Task' } });
    fireEvent.click(button);

    // The new task should appear in the task list
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });
}); 