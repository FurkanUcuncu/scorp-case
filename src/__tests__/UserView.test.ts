import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import { useUserStore } from '@stores/userStore';
import UserView from '@views/UserView.vue';
import UserDetails from '@components/UserDetails.vue';
import { IUser } from '@/types/user.types';
import { describe, it, expect, beforeEach } from 'vitest';

const mockUser: IUser = {
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
};

describe('UserView.vue', () => {
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
          component: UserView
        }
      ]
    });
  });

  it('renders UserDetails component when user is selected', async () => {
    store.selectedUser = mockUser;
    
    const wrapper = mount(UserView, {
      global: {
        plugins: [pinia, router]
      }
    });

    await router.isReady();
    expect(wrapper.findComponent(UserDetails).exists()).toBe(true);
  });

  it('navigates to home when no user is selected', async () => {
    store.selectedUser = null;
    
    mount(UserView, {
      global: {
        plugins: [pinia, router]
      }
    });

    await router.isReady();
    expect(router.currentRoute.value.path).toBe('/');
  });

  it('updates when selected user changes', async () => {
    store.selectedUser = mockUser;
    
    const wrapper = mount(UserView, {
      global: {
        plugins: [pinia, router]
      }
    });

    await router.isReady();
    const newUser = {
      ...mockUser,
      firstName: 'Jane'
    };
    store.selectedUser = newUser;

    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(UserDetails).exists()).toBe(true);
  });
}); 