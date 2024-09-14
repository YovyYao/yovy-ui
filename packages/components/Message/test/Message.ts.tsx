import { describe, test, expect } from 'vitest';
import { nextTick } from 'vue';

/**
 * 处理异步动画
 * @returns 
 */
const asyncFn = async () => {
	return new Promise(res => {
		requestAnimationFrame(() => {
			requestAnimationFrame(async () => {
				res(null)
				await nextTick()
			})
		})
	})
}

function getTopValue(e: Element) {
	const styles = window.getComputedStyle(e)
	const topValue = styles.getPropertyValue('top')
	return Number.parseFloat(topValue)
}

describe('Message', () => {
	test('message() function', async () => {
		const handler = message({message: 'hello message', duration: 0})
		await asyncFn()
		expect(document.querySelector('.yo-message')).toBeTruthy()
		handler.close()
		await asyncFn()
		expect(document.querySelector('.yo-message')).toBeFalsy()
	})

	test('call message() function more than once', async () => {
		message({ message: 'hello message', duration: 0 })
		message({ message: 'hello message1', duration: 0 })
		await asyncFn()
		expect(document.querySelectorAll('.yo-message').length).toBe(2)
		closeAll()
		await asyncFn()
		expect(document.querySelector('.yo-message')).toBeFalsy()
	})
})