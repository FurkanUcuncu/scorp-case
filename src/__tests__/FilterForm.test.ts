import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useUserStore } from '@stores/userStore';
import FilterForm from '@components/FilterForm.vue';
import { describe, it, expect, beforeEach } from 'vitest';

describe('FilterForm.vue', () => {
  let pinia: any;
  let store: any;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    store = useUserStore();
  });

  it('toggles dropdown when filter button is clicked', async () => {
    const wrapper = mount(FilterForm, {
      global: {
        plugins: [pinia]
      }
    });

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.find('.absolute').exists()).toBe(true);
  });

  it('updates search input value', async () => {
    const wrapper = mount(FilterForm, {
      global: {
        plugins: [pinia]
      }
    });

    await wrapper.find('[data-testid="filter-form-button"]').trigger('click');
    
    const input = wrapper.find('[data-testid="filter-form-input"]');
    await input.setValue('New York');

    expect(store.currentFilter).toBe('');
  });

  it('updates gender select value', async () => {
    const wrapper = mount(FilterForm, {
      global: {
        plugins: [pinia]
      }
    });

    await wrapper.find('[data-testid="filter-form-button"]').trigger('click');
    
    const select = wrapper.find('select');
    await select.setValue('male');

    expect(select.element.value).toBe('male');
  });

  it('applies filters when submit button is clicked', async () => {
    const wrapper = mount(FilterForm, {
      global: {
        plugins: [pinia]
      }
    });

    await wrapper.find('[data-testid="filter-form-button"]').trigger('click');
    
    await wrapper.find('[data-testid="filter-form-input"]').setValue('New York');
    await wrapper.find('[data-testid="filter-form-select"]').setValue('male');

    await wrapper.find('[data-testid="filter-form-apply-button"]').trigger('click');

    expect(store.currentFilter).toBe('New York');
    expect(store.currentGenderFilter).toBe('male');
  });

  it('resets filters when reset button is clicked', async () => {
    const wrapper = mount(FilterForm, {
      global: {
        plugins: [pinia]
      }
    });

    await wrapper.find('[data-testid="filter-form-button"]').trigger('click');

    await wrapper.find('[data-testid="filter-form-input"]').setValue('New York');
    await wrapper.find('[data-testid="filter-form-select"]').setValue('male');

    await wrapper.find('[data-testid="filter-form-reset-button"]').trigger('click');

    expect(store.currentFilter).toBe('');
    expect(store.currentGenderFilter).toBe('');
  });

  it('closes dropdown after applying filters', async () => {
    const wrapper = mount(FilterForm, {
      global: {
        plugins: [pinia]
      }
    });

    await wrapper.find('[data-testid="filter-form-button"]').trigger('click');
    expect(wrapper.find('[data-testid="filter-form-dropdown"]').exists()).toBe(true);

    await wrapper.find('[data-testid="filter-form-apply-button"]').trigger('click');

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.absolute').exists()).toBe(false);
  });
}); 