// 自定义主题的入口
import type { App } from 'vue';
import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import DefaultTheme from 'vitepress/theme';
import "@vitepress-demo-preview/component/dist/style.css"

// 引入YovyPlus和样式, 让其能够在文档中展示
import YovyPlus from 'yovy-ui';
import 'yovy-ui/dist/index.css'

export default {
	...DefaultTheme,
	enhanceApp({ app }: { app: App }) {
		app.component("demo-preview", ElementPlusContainer)
		app.use(YovyPlus)
	}
}