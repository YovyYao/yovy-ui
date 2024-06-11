import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import YovyPlus from 'yovy-ui'

createApp(App)
	.use(YovyPlus)
	.mount('#app')
