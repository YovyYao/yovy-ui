import { App, Plugin } from 'vue';
import { each } from 'lodash-es';

type SFCWithinstall<T> = T & Plugin

// 全局引入
export function makeInstaller(components: Plugin[]) {
	const installer = (app: App) => each(components, c => app.use(c))
	
	return installer as Plugin
}

export const withInstall = <T>(component: T) => {
	(component as SFCWithinstall<T>).install = (app: App) => {
		const name = (component as any).name
		app.component(name, component as Plugin)
	}

	return component as SFCWithinstall<T>
}