import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { describe, it, expect, beforeEach } from 'vitest';
import { useUserStore } from '@/stores/userStore';

describe('Error.vue', () => {
  let pinia: any;
  let store: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    store = useUserStore();
  });

  it('renders error message correctly', () => {
    const wrapper = mount(ErrorMessage);

    store.error = new Error('Test error');

    expect(wrapper.find('[data-testid="error-message"]').text()).toBe('');
  });

  it('renders error icon', () => {
    const wrapper = mount(ErrorMessage);

    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('has correct styling classes', () => {
    const wrapper = mount(ErrorMessage, {
      global: {
        plugins: [pinia]
      }
    });

    store.error = new Error('Test error');

    expect(wrapper.find('.text-red-700').exists()).toBe(true);
    expect(wrapper.find('.items-center').exists()).toBe(true);
  });
}); 