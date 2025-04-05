import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import { useUserStore } from '@stores/userStore';
import TableBody from '@components/TableBody.vue';
import { IUser } from '@/types/user.types';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TableBody.vue', () => {
  let pinia: any;
  let store: any;
  let router: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    store = useUserStore();

    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/',
          name: 'home',
          component: { template: '<div>Home</div>' }
        },
        {
          path: '/user',
          name: 'user',
          component: { template: '<div>User</div>' }
        }
      ]
    });
  });

  it('renders loading state correctly', async () => {
    store.isFetching = true;
    
    const wrapper = mount(TableBody, {
      global: {
        plugins: [pinia, router]
      }
    });

    await router.isReady();
    expect(wrapper.find('[data-testid="table-skeleton"]').exists()).toBe(true);
  });

  it('renders error state correctly', async () => {
    store.isFetching = false;
    store.error = new Error('Test error');
    
    const wrapper = mount(TableBody, {
      global: {
        plugins: [pinia, router]
      }
    });

    await router.isReady();
    expect(wrapper.find('.text-red-700').exists()).toBe(true);
    expect(wrapper.text()).toContain('Test error');
  });

  it('renders no users found message when users array is empty', async () => {
    store.isFetching = false;
    store.error = null;
    store.filteredUsers = [];
    
    const wrapper = mount(TableBody, {
      global: {
        plugins: [pinia, router]
      }
    });

    await router.isReady();
    expect(wrapper.text()).toContain('No users found');
  });

  it('renders user data correctly', async () => {
    const mockUsers: IUser[] = [
      {
        id: "1",
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        gender: 'male',
        age: 30,
        address: {
          city: 'Anytown',
          country: 'USA'
        }
      }
    ];

    store.isFetching = false;
    store.error = null;
    store.filteredUsers = mockUsers;
    
    const wrapper = mount(TableBody, {
      global: {
        plugins: [pinia, router]
      }
    });

    await router.isReady();
    expect(wrapper.text()).toContain('John');
    expect(wrapper.text()).toContain('Doe');
    expect(wrapper.text()).toContain('john@example.com');
  });

  it('navigates to user detail page when row is clicked', async () => {
    const mockUsers: IUser[] = [
      {
        id: "1",
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        gender: 'male',
        age: 30,
        address: {
          city: 'Anytown',
          country: 'USA'
        }
      }
    ];

    store.isFetching = false;
    store.error = null;
    store.filteredUsers = mockUsers;
    
    const wrapper = mount(TableBody, {
      global: {
        plugins: [pinia, router]
      }
    });

    await router.isReady();
    const row = wrapper.find('tr');
    await row.trigger('click');

    expect(store.selectedUser).toEqual(mockUsers[0]);
    expect(router.currentRoute.value.path).toBe('/');
  });
}); 