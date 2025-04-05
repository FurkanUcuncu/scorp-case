import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import Sorter from '@components/Sorter.vue';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Sorter.vue', () => {
  let pinia: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
  });

  it('renders both sort icons', () => {
    const wrapper = mount(Sorter, {
      props: {
        sortColumn: 'name',
        currentSort: {
          sort: 'name',
          direction: 'asc'
        }
      },
      global: {
        plugins: [pinia]
      }
    });

    expect(wrapper.find('[data-testid="name-sorter-asc"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="name-sorter-desc"]').exists()).toBe(true);
  });

  it('shows active state correctly', () => {
    const wrapper = mount(Sorter, {
      props: {
        sortColumn: 'name',
        currentSort: {
          sort: 'name',
          direction: 'asc'
        }
      },
      global: {
        plugins: [pinia]
      }
    });

    const ascSorter = wrapper.find('[data-testid="name-sorter-asc"]');
    expect(ascSorter.classes()).toContain('opacity-100');
  });

  it('shows correct opacity for ascending sort', () => {
    const wrapper = mount(Sorter, {
      props: {
        sortColumn: 'name',
        currentSort: {
          sort: 'name',
          direction: 'asc'
        }
      },
      global: {
        plugins: [pinia]
      }
    });

    const ascSorter = wrapper.find('[data-testid="name-sorter-asc"]');
    const descSorter = wrapper.find('[data-testid="name-sorter-desc"]');
    
    expect(ascSorter.classes()).toContain('opacity-100');
    expect(descSorter.classes()).toContain('opacity-30');
  });

  it('shows correct opacity for descending sort', () => {
    const wrapper = mount(Sorter, {
      props: {
        sortColumn: 'name',
        currentSort: {
          sort: 'name',
          direction: 'desc'
        }
      },
      global: {
        plugins: [pinia]
      }
    });

    const ascSorter = wrapper.find('[data-testid="name-sorter-asc"]');
    const descSorter = wrapper.find('[data-testid="name-sorter-desc"]');
    
    expect(ascSorter.classes()).toContain('opacity-30');
    expect(descSorter.classes()).toContain('opacity-100');
  });

  it('shows correct opacity for no sort', () => {
    const wrapper = mount(Sorter, {
      props: {
        sortColumn: 'name',
        currentSort: {
          sort: '',
          direction: 'asc'
        }
      },
      global: {
        plugins: [pinia]
      }
    });

    const ascSorter = wrapper.find('[data-testid="name-sorter-asc"]');
    const descSorter = wrapper.find('[data-testid="name-sorter-desc"]');
    
    expect(ascSorter.classes()).toContain('opacity-30');
    expect(descSorter.classes()).toContain('opacity-30');
  });
}); 