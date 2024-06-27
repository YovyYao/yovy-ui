// 测试全局引入的makeInstaller和按需引入的withInstall
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, createApp } from 'vue';

import { withInstall, makeInstaller } from '../install';

const AppComp = defineComponent({
	setup() {
		return () => <div>App</div>;
	}
})

const compA = withInstall(defineComponent({
	name: "CompA",
	setup() {
		return () => <div>组件A</div>
	}
}))

const compB = withInstall(defineComponent({
	name: "CompB",
	setup() {
		return () => <div>组件B</div>
	}
}))

describe('@yovy-ui/utils/install', () => {
	it('withInstall should be worked', () => {
		const wrapper = mount(() => <div id='app'></div>)
		const app = createApp(AppComp)

		app.use(compA).mount(wrapper.element)

		// 期望组件A和组件B上有 install()
		expect(compA.install).toBeDefined()
		expect(compB.install).toBeDefined()
		// 期望能在模板中找到组件A和组件B
		expect(app._context.components['CompA']).toBeTruthy()
		expect(app._context.components['CompB']).toBeFalsy()
	})

	it('makeInstaller should be worked', () => {
		const wrapper = mount(() => <div id='app'></div>)
		const app = createApp(AppComp)
		const installer = makeInstaller([compA, compB])

		app.use(installer).mount(wrapper.element)
		
		// 期望能到installer()
		expect(installer).toBeDefined()
		// 期望能在模板中找到组件A和组件B
		expect(wrapper.findComponent(compA)).toBeTruthy()
		expect(wrapper.findComponent(compB)).toBeTruthy()
	})
})
