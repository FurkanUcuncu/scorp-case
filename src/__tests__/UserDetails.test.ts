import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@stores/userStore';
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

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: { template: '<div>Home</div>' }
    }
  ]
});

describe('UserDetails.vue', () => {
  let pinia: any;
  let store: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    store = useUserStore();
  });

  it('renders user details correctly', () => {
    store.selectedUser = mockUser;
    
    const wrapper = mount(UserDetails, {
      global: {
        plugins: [pinia, router]
      }
    });

    expect(wrapper.text()).toContain('John Doe');
    expect(wrapper.text()).toContain('john@example.com');
    expect(wrapper.text()).toContain('Anytown');
  });

  it('shows back button', () => {
    store.selectedUser = mockUser;
    
    const wrapper = mount(UserDetails, {
      global: {
        plugins: [pinia, router]
      }
    });

    const backButton = wrapper.find('button');
    expect(backButton.exists()).toBe(true);
    expect(backButton.text()).toContain('Back to Users List');
  });

  it('navigates back when back button is clicked', async () => {
    store.selectedUser = mockUser;
    
    const wrapper = mount(UserDetails, {
      global: {
        plugins: [pinia, router]
      }
    });

    const backButton = wrapper.find('button');
    await backButton.trigger('click');

    expect(router.currentRoute.value.path).toBe('/');
  });

  it('shows favorite button', () => {
    store.selectedUser = mockUser;
    
    const wrapper = mount(UserDetails, {
      global: {
        plugins: [pinia, router]
      }
    });

    const favoriteButton = wrapper.find('button:last-child');
    expect(favoriteButton.exists()).toBe(true);
    expect(favoriteButton.find('svg').exists()).toBe(true);
  });

  it('toggles favorite status when favorite button is clicked', async () => {
    store.selectedUser = mockUser;
    
    const wrapper = mount(UserDetails, {
      global: {
        plugins: [pinia, router]
      }
    });

    const favoriteButton = wrapper.find('[data-testid="favorite-button"]');
    await favoriteButton.trigger('click');

    expect(store.favorites[0].id).toBe("1");
  });

  it('shows correct favorite button color based on favorite status', async () => {
    store.selectedUser = mockUser;
    store.favorites = [mockUser.id];
    
    const wrapper = mount(UserDetails, {
      global: {
        plugins: [pinia, router]
      }
    });

    const favoriteButton = wrapper.find('[data-testid="favorite-button"]');
    await favoriteButton.trigger('click');

    expect(favoriteButton.classes()).toContain('text-red-500');
  });
});
