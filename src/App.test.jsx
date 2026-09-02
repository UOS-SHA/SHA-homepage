import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';

afterEach(() => {
  window.location.hash = '';
});

describe('App', () => {
  it('renders the study route through the hash router', () => {
    window.location.hash = '#/study';

    render(<App />);

    expect(screen.getAllByText('STUDY LOG')).toHaveLength(2);
  });
});
