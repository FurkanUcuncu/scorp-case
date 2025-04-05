import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { config } from '@vue/test-utils';

// // Mock fetch globally
// global.fetch = vi.fn().mockImplementation(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({
//       users: [
//         {
//           id: 1,
//           firstName: 'John',
//           lastName: 'Doe',
//           email: 'john@example.com',
//           gender: 'male',
//           address: {
//             city: 'Anytown',
//             country: 'USA'
//           }
//         }
//       ],
//       total: 1
//     })
//   })
// );

// // Mock IntersectionObserver
// const mockIntersectionObserver = vi.fn();
// mockIntersectionObserver.mockReturnValue({
//   observe: () => null,
//   unobserve: () => null,
//   disconnect: () => null
// });
// window.IntersectionObserver = mockIntersectionObserver;

// // Mock ResizeObserver
// const mockResizeObserver = vi.fn();
// mockResizeObserver.mockReturnValue({
//   observe: () => null,
//   unobserve: () => null,
//   disconnect: () => null
// });
// window.ResizeObserver = mockResizeObserver;
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
// Configure Vue Test Utils
config.global.mocks = {
    $t: (key: string) => key,
}; 