import type { App, Plugin } from 'vue';
import { each } from 'lodash-es';
import { provideGloabalConfig, type ConfigProviderProps } from '@yovy-ui/components';

/**
 * 遍历组件数组, 为每一个组件使用use函数, 以达到全局引入的目的
 * 新增参数 options?: ConfigProviderProps (为了支持全局配置的语言包)
 * @param components 组件数组
 * @returns 返回一个遍历了所有组件之后的install函数, 作为参数提供给App.use()
 */
export function makeInstaller(components: Plugin[]) {
	const installer = (app: App, options?: ConfigProviderProps) => {
		each(components, c => app.use(c))
		if(options) provideGloabalConfig(options, app, true)
	}
	return installer as Plugin
}