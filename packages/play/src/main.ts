import { createApp } from 'vue'
import App from './App.vue'

import YovyPlus from 'yovy-ui'
import 'yovy-ui/dist/index.css'

createApp(App)
	.use(YovyPlus)
	.mount('#app')
