import type { App, Plugin } from 'vue';
// import { each } from 'lodash-es';

type SFCWithinstall<T> = T & Plugin

// /**
//  * 遍历组件数组, 为每一个组件使用use函数, 以达到全局引入的目的
//  * @param components 组件数组
//  * @returns 返回一个遍历了所有组件之后的install函数, 作为参数提供给App.use()
//  */
// export function makeInstaller(components: Plugin[]) {
// 	const installer = (app: App) => each(components, c => app.use(c))
	
// 	return installer as Plugin
// }

/**
 * 为组件添加install函数, install函数里为组件命名, 以及调用component函数
 * @param component Vue组件
 * @returns 拥有install函数的组件对象
 */
export const withInstall = <T>(component: T) => {
	(component as SFCWithinstall<T>).install = (app: App) => {
		const name = (component as any).name
		app.component(name, component as Plugin)
	}

	return component as SFCWithinstall<T>
}