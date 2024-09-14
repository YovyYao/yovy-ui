import { createApp } from 'vue';
import App from './App.vue';

import YovyPlus, { zhCN } from 'yovy-ui';
import 'yovy-ui/dist/index.css';

createApp(App)
	.use(YovyPlus, { locale: zhCN })
	.mount('#app')
