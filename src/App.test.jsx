import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';

afterEach(() => {
  cleanup();
  window.location.hash = '';
  vi.useRealTimers();
});

describe('App', () => {
  it('renders the study route through the hash router', () => {
    window.location.hash = '#/study';

    render(<App />);

    expect(screen.getAllByText('STUDY LOG')).toHaveLength(2);
  });

  it('keeps the achievement wheel aligned with the selected semester', () => {
    vi.useFakeTimers();
    window.scrollTo = vi.fn();
    HTMLMediaElement.prototype.play = vi.fn();
    window.location.hash = '#/';

    const { container } = render(<App />);
    const achievements = container.querySelector('.achievements-test');

    const semesters = [
      ['45deg', '2025 2학기'],
      ['90deg', '2025 1학기'],
      ['135deg', '2024 1학기'],
    ];

    semesters.forEach(([angle, semester]) => {
      fireEvent.click(achievements);
      act(() => vi.advanceTimersByTime(800));

      expect(achievements.querySelector('.circle-wrapper-2')).toHaveStyle({
        transform: `rotate(${angle})`,
      });
      expect(achievements.querySelector('.info-header h2')).toHaveTextContent(semester);
    });
  });
});
