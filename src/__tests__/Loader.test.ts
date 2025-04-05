import { mount } from '@vue/test-utils';
import Loader from '@/components/Loader.vue';
import { describe, it, expect } from 'vitest';

describe('Loader.vue', () => {

    it('renders loader correctly', () => {
        const wrapper = mount(Loader);

        expect(wrapper.find('[data-testid="loader"]').text()).toBe('');
    });
}); 