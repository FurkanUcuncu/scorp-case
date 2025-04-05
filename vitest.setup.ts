import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { config } from '@vue/test-utils';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Configure Vue Test Utils
config.global.mocks = {
  $t: (key: string) => key,
}; 