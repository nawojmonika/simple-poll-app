import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Sir Vote-a-lot header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sir Vote-a-lot/i);
  expect(linkElement).toBeInTheDocument();
});
