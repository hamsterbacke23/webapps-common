import { mount } from '@vue/test-utils';

import TextArea from '~/ui/components/forms/TextArea';

describe('TextArea.vue', () => {
    it('renders', () => {
        const wrapper = mount(TextArea, {
            propsData: {
                value: 'Test value'
            }
        });
        expect(wrapper.html()).toBeTruthy();
        expect(wrapper.isVisible()).toBeTruthy();
        let textArea = wrapper.find('textarea');
        expect(textArea.element.value).toBe('Test value');
    });

    it('renders invalid state', () => {
        const wrapper = mount(TextArea, {
            propsData: {
                value: 'Test value',
                isValid: false
            }
        });
        let textArea = wrapper.find('textarea');
        expect(textArea.classes()).toContain('invalid');
    });

    it('emits input events', () => {
        const wrapper = mount(TextArea);
        const newValue = 'new value';
        let textArea = wrapper.find('textarea');
        textArea.setValue(newValue);
        expect(wrapper.emitted().input[0][0]).toEqual(newValue);
    });

    it('is valid when it has a value', () => {
        const wrapper = mount(TextArea);
        expect(wrapper.vm.validate()).toBe(true);
    });
});
