import { createApp, ref } from 'vue';
import App from './App.vue';

import YovyPlus, { zhCN } from 'yovy-ui';
import 'yovy-ui/dist/index.css';

createApp(App)
	.use(YovyPlus, { locale: zhCN })
	.mount('#app')


// // demo
// type myType = number | string

// type ComponentFn = {
// 	(params: number): myType
// 	get(): number
// }

// const compFn: ComponentFn = () => {
// 	console.log("function '(params: number): myType' of type ComponentFn has been called");
// 	return 1
// }
// compFn.get = () => {
// 	console.log("function 'get(): number' of type ComponentFn has been called");
// 	return 2
// }

// // test
// compFn(1)
// compFn.get()

// // demo
// type MessageType = 'info' | 'success' | 'warning' | 'error' | 'danger'

// type Message = {
// 	duration?: number
// 	type?: MessageType
// 	offset?: number
// 	transitionName?: string
// }

// export const messageDefaults = {
// 	type: 'info',
// 	duration: 2000,
// 	offset: 10,
// 	transitionName: 'fade-up',
// } as const

// const testFn = (): Message => {
// 	// const temp: Message = messageDefaults as Message
// 	return messageDefaults
// }

// type temp = keyof typeof messageDefaults

// console.log(typeof messageDefaults.type);

// demo
// const temp = ref('string')

// const obj = {
// 	temp: temp
// }