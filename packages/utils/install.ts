import type { App, Plugin } from 'vue';
// import { each } from 'lodash-es';

type SFCWithInstall<T> = T & Plugin

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
	(component as SFCWithInstall<T>).install = (app: App) => {
		const name = (component as any).name
		app.component(name, component as Plugin)
	}

	return component as SFCWithInstall<T>
}

/**
 * 为了能够让Message组件挂载到全局的app上, 需要使用此函数. 通过将Message的配置项放到app.config上, 从而达成Message全局挂载的目的.
 * @param fn 一个拥有install函数的对象或组件
 * @param name 给挂载到app的属性的名称
 * @returns 返回一个SFCWithInstall类型的函数, 并在未来将会被调用
 */
export const globalMountWithInstall = <T>(fn: T, name: string) => {
	(fn as SFCWithInstall<T>).install = (app: App) => {
		app.config.globalProperties[name] = fn
	}
	return fn as SFCWithInstall<T>
}