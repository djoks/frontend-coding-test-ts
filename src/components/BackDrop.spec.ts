import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Backdrop from '@/components/BackDrop.vue';

describe('Backdrop', () => {
    it('calls the close function when the backdrop is clicked', async () => {
        const closeProp = vi.fn(); // Mock function
        const wrapper = mount(Backdrop, {
            props: { close: closeProp },
        });

        // Simulate click on the backdrop
        await wrapper.trigger('click');

        // Assert close function was called
        expect(closeProp).toHaveBeenCalled();
    });

    it('does not call the close function when click event originates from a child element', async () => {
        const closeProp = vi.fn(); // Mock function
        const wrapper = mount(Backdrop, {
            props: { close: closeProp },
            slots: {
                default: '<div class="child">Slot Content</div>',
            },
        });

        // Simulate click on the child element
        await wrapper.find('.child').trigger('click');

        // Assert close function was not called
        expect(closeProp).not.toHaveBeenCalled();
    });

    it('renders slot content', () => {
        const wrapper = mount(Backdrop, {
            slots: {
                default: '<div class="slot-content">Slot Content</div>',
            },
        });

        // Assert slot content is rendered
        expect(wrapper.find('.slot-content').exists()).toBe(true);
        expect(wrapper.text()).toContain('Slot Content');
    });
});