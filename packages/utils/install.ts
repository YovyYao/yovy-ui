<<<<<<< HEAD
import type { App, Plugin } from 'vue';
=======
import { App, Plugin } from 'vue';
>>>>>>> cfac2cb25c3cd0797e12721fe950de9ff98d6ff9
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