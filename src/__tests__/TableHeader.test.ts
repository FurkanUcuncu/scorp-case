import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import TableHeader from '@components/TableHeader.vue';
import { tableColumns } from '@/utils/constants';

describe('TableHeader.vue', () => {
  let pinia: any;
  let store: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    store = useUserStore();
  });

  it('renders all column headers correctly', () => {
    const wrapper = mount(TableHeader, {
      global: {
        plugins: [pinia]
      }
    });

    const headers = wrapper.findAll('th');
    expect(headers.length).toBe(tableColumns.length);

    tableColumns.forEach((column, index) => {
      expect(headers[index].text()).toContain(column.label);
    });
  });

  it('renders Sorter component for each column', () => {
    const wrapper = mount(TableHeader, {
      global: {
        plugins: [pinia]
      }
    });

    const sorters = wrapper.findAllComponents({ name: 'Sorter' });
    expect(sorters.length).toBe(2);
  });

  it('updates sort state when column is clicked', async () => {
    const wrapper = mount(TableHeader, {
      global: {
        plugins: [pinia]
      }
    });

    const firstColumn = wrapper.find('[data-testid="th-name"]');
    await firstColumn.trigger('click');

    expect(store.sort.sort).toBe('firstName');
    expect(store.sort.direction).toBe('asc');
  });

  it('cycles through sort directions correctly', async () => {
    const wrapper = mount(TableHeader, {
      global: {
        plugins: [pinia]
      }
    });

    const firstColumn = wrapper.find('th');
    
    await firstColumn.trigger('click');
    expect(store.sort.direction).toBe('asc');

    await firstColumn.trigger('click');
    expect(store.sort.direction).toBe('asc');

    await firstColumn.trigger('click');
    expect(store.sort.direction).toBe('asc');
  });
}); 