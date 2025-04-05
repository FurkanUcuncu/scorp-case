import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import NotFound from '@components/NotFound.vue';

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

describe('NotFound.vue', () => {
  it('renders 404 message correctly', () => {
    const wrapper = mount(NotFound, {
      global: {
        plugins: [createPinia(), router]
      }
    });

    expect(wrapper.find('h1').text()).toBe('404');
    expect(wrapper.find('h2').text()).toBe('Page Not Found');
    expect(wrapper.find('p').text()).toContain("The page you're looking for doesn't exist");
  });

  it('has a working "Go to Dashboard" button', async () => {
    const wrapper = mount(NotFound, {
      global: {
        plugins: [createPinia(), router]
      }
    });

    const button = wrapper.find('button');
    expect(button.text()).toBe('Go to Dashboard');

    await button.trigger('click');
    expect(router.currentRoute.value.path).toBe('/');
  });
}); 