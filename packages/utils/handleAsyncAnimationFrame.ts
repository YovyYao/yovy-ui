import { nextTick } from 'vue';

/**
 * 处理异步动画
 * @returns 
 */
export const asyncFn = async () => {
	return new Promise(res => {
		requestAnimationFrame(() => {
			requestAnimationFrame(async () => {
				res(null)
				await nextTick()
			})
		})
	})
}