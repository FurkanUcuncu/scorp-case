import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useUserStore } from '@stores/userStore';
import Pagination from '@components/Pagination.vue';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Pagination.vue', () => {
  let pinia: any;
  let store: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    store = useUserStore();
    store.total = 100;
  });

  it('renders correct number of page buttons', () => {
    store.total = 100;
    store.currentPage = 1;
    
    const wrapper = mount(Pagination, {
      props: {
        range: 2
      },
      global: {
        plugins: [pinia]
      }
    });

    const pageButtons = wrapper.findAll('button').filter(btn => !btn.text().includes('...'));
    expect(pageButtons.length).toBe(6);
  });

  it('disables previous button on first page', () => {
    store.currentPage = 1;
    
    const wrapper = mount(Pagination, {
      global: {
        plugins: [pinia]
      }
    });

    const prevButton = wrapper.find('[data-testid="pagination-prev-button"]');
    expect(prevButton.attributes('disabled')).toBeDefined();
  });

  it('disables next button on last page', async () => {
    store.total = 100;
    store.currentPage = 10;
    
    const wrapper = mount(Pagination, {
      props: {
        range: 2
      },
      global: {
        plugins: [pinia]
      }
    });

    const nextButton = wrapper.find('[data-testid="pagination-next-button"]');
    await nextButton.trigger('click');

    expect(nextButton.attributes('disabled')).toBeDefined();
  });

  it('updates current page when page button is clicked', async () => {
    store.currentPage = 1;
    
    const wrapper = mount(Pagination, {
      global: {
        plugins: [pinia]
      }
    });

    const pageButton = wrapper.findAll('button').find(btn => btn.text() === '2');
    if (pageButton) {
      await pageButton.trigger('click');
      expect(store.currentPage).toBe(2);
    }
  });

  it('shows correct active page button', () => {
    store.currentPage = 2;
    
    const wrapper = mount(Pagination, {
      global: {
        plugins: [pinia]
      }
    });

    const activeButton = wrapper.find('[data-testid="pagination-button-2"]');
    expect(activeButton.exists()).toBe(true);
    expect(activeButton.text()).toBe('2');
  });

  it('handles page jump correctly', async () => {
    store.currentPage = 5;
    store.total = 100;
    
    const wrapper = mount(Pagination, {
      props: {
        range: 2,
        jumpSize: 5
      },
      global: {
        plugins: [pinia]
      }
    });

    const ellipsisButton = wrapper.findAll('button').find(btn => btn.text() === '...');
    if (ellipsisButton) {
      await ellipsisButton.trigger('click');
      expect(store.currentPage).toBe(1);
    }
  });

  it('shows correct ellipsis button text on hover', async () => {
    store.currentPage = 5;
    store.total = 100;
    
    const wrapper = mount(Pagination, {
      props: {
        range: 2
      },
      global: {
        plugins: [pinia]
      }
    });

    const ellipsisButton = wrapper.findAll('button').find(btn => btn.text() === '...');
    if (ellipsisButton) {
      await ellipsisButton.trigger('mouseenter');
      expect(ellipsisButton.text()).toBe('<');
      
      await ellipsisButton.trigger('mouseleave');
      expect(ellipsisButton.text()).toBe('...');
    }
  });

  it('disables all buttons when fetching', () => {
    store.isFetching = true;
    
    const wrapper = mount(Pagination, {
      global: {
        plugins: [pinia]
      }
    });

    const buttons = wrapper.findAll('button');
    buttons.forEach(button => {
      expect(button.attributes('disabled')).toBeDefined();
    });
  });

  it('calculates page range correctly', () => {
    store.currentPage = 5;
    store.total = 100;
    
    const wrapper = mount(Pagination, {
      props: {
        range: 2
      },
      global: {
        plugins: [pinia]
      }
    });

    const pageButtons = wrapper.findAll('button').filter(btn => !btn.text().includes('...'));
    const pageNumbers = pageButtons.map(btn => parseInt(btn.text()));
    
    expect(pageNumbers).toContain(1);
    expect(pageNumbers).toContain(3);
    expect(pageNumbers).toContain(4);
    expect(pageNumbers).toContain(5);
    expect(pageNumbers).toContain(6);
    expect(pageNumbers).toContain(7);
    expect(pageNumbers).toContain(10);
  });

  it('does not render when total pages is 1', () => {
    store.total = 10;
    store.currentPage = 1;
    
    const wrapper = mount(Pagination, {
      global: {
        plugins: [pinia]
      }
    });

    expect(wrapper.find('[data-testid="pagination-container"]').exists()).toBe(false);
  });
}); 