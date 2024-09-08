import type { App, Plugin } from 'vue';
import { each } from 'lodash-es';
import { provideGloabalConfig, type ConfigProviderProps } from '@yovy-ui/components';

/**
 * 遍历组件数组, 为每一个组件使用use函数, 以达到全局引入的目的
 * @param components 组件数组
 * @returns 返回一个遍历了所有组件之后的install函数, 作为参数提供给App.use()
 */
export function makeInstaller(components: Plugin[]) {
	const installer = (app: App) => each(components, c => app.use(c))
	
	return installer as Plugin
}