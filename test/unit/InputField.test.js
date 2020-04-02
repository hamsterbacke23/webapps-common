import { mount } from '@vue/test-utils';

import InputField from '~/ui/components/forms/InputField';

describe('InputField.vue', () => {
    it('renders', () => {
        const wrapper = mount(InputField, {
            propsData: {
                value: 'Test value'
            }
        });
        expect(wrapper.html()).toBeTruthy();
        expect(wrapper.isVisible()).toBeTruthy();
        expect(wrapper.is('div')).toBeTruthy();
        let input = wrapper.find('input');
        expect(input.attributes('type')).toBe('text'); // default
        expect(input.element.value).toBe('Test value');
    });

    it('renders invalid style', () => {
        const wrapper = mount(InputField, {
            propsData: {
                value: 'Test value',
                isValid: false
            }
        });
        expect(wrapper.find('.invalid-marker').exists()).toBe(true);
    });

    it('renders with icon slot', () => {
        const wrapper = mount(InputField, {
            slots: {
                icon: '<svg />'
            }
        });
        expect(wrapper.find('input').classes()).toContain('with-icon');
        expect(wrapper.find('svg').exists()).toBeTruthy();
    });

    it('renders custom type', () => {
        const wrapper = mount(InputField, {
            propsData: {
                type: 'password'
            }
        });
        let input = wrapper.find('input');
        expect(input.attributes('type')).toBe('password');
    });

    it('validates without pattern', () => {
        const wrapper = mount(InputField, {
            propsData: {
                value: 'b'
            }
        });
        expect(wrapper.vm.validate()).toBe(true);
    });

    it('invalidates non-matching pattern', () => {
        const wrapper = mount(InputField, {
            propsData: {
                value: 'b',
                pattern: '^a'
            }
        });
        expect(wrapper.vm.validate()).toBe(false);
    });

    it('validates unicode', () => {
        const wrapper = mount(InputField, {
            propsData: {
                value: 'Testing «ταБЬℓσ»: 1<2 & 4+1>3, now 20% off!',
                pattern: `[\u0000-\uFFFF]*`
            }
        });
        expect(wrapper.vm.validate()).toBe(true);
    });

    it('validates unicode pattern', () => {
        const wrapper = mount(InputField, {
            propsData: {
                value: 'te%tString!"$<>',
                pattern: '[\u0000-\u007F]+'
            }
        });
        expect(wrapper.vm.validate()).toBe(true);
    });

    it('invalidates wrong unicode pattern', () => {
        const wrapper = mount(InputField, {
            propsData: {
                value: 'te%tSætring!"$<>',
                pattern: '[\u0000-\u007F]+'
            }
        });
        expect(wrapper.vm.validate()).toBe(false);
    });

    it('validates emojis', () => {
        const wrapper = mount(InputField, {
            propsData: {
                value: '👌',
                pattern: `\\p{Emoji_Presentation}+`
            }
        });
        expect(wrapper.vm.validate()).toBe(true);
    });

    it('validates multiple unicode ranges', () => {
        const wrapper = mount(InputField, {
            propsData: {
                value: 'adaሑtest',
                pattern: `([\u1200-\u12BF]|[\u0000-\u007F])*`
            }
        });
        expect(wrapper.vm.validate()).toBe(true);
    });

    it('emits input events', () => {
        const wrapper = mount(InputField);
        const newValue = 'new value';
        let input = wrapper.find('input');
        input.setValue(newValue);
        expect(wrapper.emitted().input[0][0]).toEqual(newValue);
    });
});
