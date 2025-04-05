import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@stores/userStore';
import HomeView from '@views/HomeView.vue';
import UserList from '@components/UserList.vue';
import { describe, it, expect, beforeEach } from 'vitest';

const router = createRouter({
  history: createWebHistory(),
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

describe('HomeView.vue', () => {
  let pinia: any;
  let store: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    store = useUserStore();
  });

  it('renders UserList component', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia, router]
      }
    });

    expect(wrapper.findComponent(UserList).exists()).toBe(true);
  });

  it('shows loading state correctly', () => {
    store.isLoading = true;
    
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia, router]
      }
    });

    expect(wrapper.find('.animate-spin').exists()).toBe(true);
  });

  it('shows error state correctly', () => {
    store.isLoading = false;
    store.error = new Error('Test error');
    
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia, router]
      }
    });

    expect(wrapper.find('.text-red-700').exists()).toBe(true);
    expect(wrapper.text()).toContain('Test error');
  });

  it('calls getUsers on mount', () => {
    const getUsersSpy = vi.spyOn(store, 'getUsers');
    
    mount(HomeView, {
      global: {
        plugins: [pinia, router]
      }
    });

    expect(getUsersSpy).toHaveBeenCalled();
  });

  it('updates users when store users change', async () => {
    const mockUsers = [
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

    store.isLoading = false;
    store.error = null;
    store.users = mockUsers;
    
    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia, router]
      }
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(UserList).exists()).toBe(true);
  });
}); 