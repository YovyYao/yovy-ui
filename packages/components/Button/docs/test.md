import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ErButton from '@/components/ErButton.vue'; // 假设组件路径为 @/components/ErButton.vue
import { h } from 'vue';

describe('ErButton Component', () => {

  it('should render default button', () => {
    const wrapper = mount(() => <ErButton>Default</ErButton>);
    expect(wrapper.text()).toBe('Default');
    expect(wrapper.classes()).toContain('er-button--default');
  });

  it('should render primary button', () => {
    const wrapper = mount(() => <ErButton type="primary">Primary</ErButton>);
    expect(wrapper.text()).toBe('Primary');
    expect(wrapper.classes()).toContain('er-button--primary');
  });

  it('should render success button', () => {
    const wrapper = mount(() => <ErButton type="success">Success</ErButton>);
    expect(wrapper.text()).toBe('Success');
    expect(wrapper.classes()).toContain('er-button--success');
  });

  it('should render info button', () => {
    const wrapper = mount(() => <ErButton type="info">Info</ErButton>);
    expect(wrapper.text()).toBe('Info');
    expect(wrapper.classes()).toContain('er-button--info');
  });

  it('should render warning button', () => {
    const wrapper = mount(() => <ErButton type="warning">Warning</ErButton>);
    expect(wrapper.text()).toBe('Warning');
    expect(wrapper.classes()).toContain('er-button--warning');
  });

  it('should render danger button', () => {
    const wrapper = mount(() => <ErButton type="danger">Danger</ErButton>);
    expect(wrapper.text()).toBe('Danger');
    expect(wrapper.classes()).toContain('er-button--danger');
  });

  it('should handle disabled state', () => {
    const wrapper = mount(() => <ErButton disabled>Disabled</ErButton>);
    expect(wrapper.attributes('disabled')).toBe('true');
    expect(wrapper.classes()).toContain('is-disabled');
  });

  it('should handle loading state', () => {
    const wrapper = mount(() => <ErButton loading>Loading</ErButton>);
    expect(wrapper.classes()).toContain('is-loading');
    expect(wrapper.find('.loading-icon').exists()).toBe(true);
  });

  it('should render with icon', () => {
    const wrapper = mount(() => (
      <ErButton icon="check">
        <span>Button with icon</span>
      </ErButton>
    ));
    expect(wrapper.find('.icon-check').exists()).toBe(true);
    expect(wrapper.text()).toContain('Button with icon');
  });

  it('should render different sizes', () => {
    let wrapper = mount(() => <ErButton size="large">Large Button</ErButton>);
    expect(wrapper.classes()).toContain('er-button--large');
    
    wrapper = mount(() => <ErButton size="small">Small Button</ErButton>);
    expect(wrapper.classes()).toContain('er-button--small');
  });

  it('should render button group', () => {
    const wrapper = mount(() => (
      <div class="er-button-group">
        <ErButton>Button 1</ErButton>
        <ErButton>Button 2</ErButton>
      </div>
    ));
    expect(wrapper.findAll('.er-button').length).toBe(2);
  });

  it('should handle throttle mode', async () => {
    const onClick = vi.fn();
    const wrapper = mount(() => (
      <ErButton use-throttle throttle-duration={500} onClick={onClick}>
        Throttled Button
      </ErButton>
    ));

    await wrapper.trigger('click');
    await wrapper.trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

});