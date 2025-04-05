import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import UserList from '@components/UserList.vue';
import TableHeader from '@components/TableHeader.vue';
import TableBody from '@components/TableBody.vue';
import Pagination from '@components/Pagination.vue';
import Error from '@/components/ErrorMessage.vue';
import FilterForm from '@components/FilterForm.vue';

describe('UserList.vue', () => {
  let pinia: any;
  let store: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    store = useUserStore();
  });

  it('renders loading state correctly', () => {
    store.isLoading = true;
    const wrapper = mount(UserList, {
      global: {
        plugins: [pinia]
      }
    });

    expect(wrapper.find('.animate-spin').exists()).toBe(true);
  });

  it('renders error state correctly', () => {
    store.isLoading = false;
    store.error = 'Test error';
    const wrapper = mount(UserList, {
      global: {
        plugins: [pinia]
      }
    });

    expect(wrapper.findComponent(Error).exists()).toBe(true);
  });

  it('renders table when data is loaded', () => {
    store.isLoading = false;
    store.error = null;
    store.users = [{ id: 1, firstName: 'John', lastName: 'Doe' }];
    
    const wrapper = mount(UserList, {
      global: {
        plugins: [pinia]
      }
    });

    expect(wrapper.findComponent(TableHeader).exists()).toBe(true);
    expect(wrapper.findComponent(TableBody).exists()).toBe(true);
    expect(wrapper.findComponent(Pagination).exists()).toBe(true);
    expect(wrapper.findComponent(FilterForm).exists()).toBe(true);
  });

  it('calls getUsers on mount', () => {
    const getUsersSpy = vi.spyOn(store, 'getUsers');
    mount(UserList, {
      global: {
        plugins: [pinia]
      }
    });

    expect(getUsersSpy).toHaveBeenCalled();
  });
}); 