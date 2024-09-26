import { describe, test, expect } from 'vitest';
import { asyncFn } from '@yovy-ui/utils';

import { notification } from '../util';

function getTopValue(e: Element) {
	const styles = window.getComputedStyle(e)
	const topValue = styles.getPropertyValue('top')
	return Number.parseFloat(topValue)
}

describe('Notification', () => {
	test('notification() function', async () => {
		const handler = notification({
			message: 'hello notification component',
			duration: 0,
			title: '这是一个通知',
			position: 'bottom-left'
		})
		await asyncFn()
		expect(document.querySelector('.yo-notification')).toBeTruthy()
		handler.close()
		await asyncFn()
		expect(document.querySelector('.yo-notification')).toBeFalsy()
	})

	test('call notification() function more than once', async () => {
		notification({
			message: 'hello notification component',
			duration: 0,
			title: '这是一个通知',
			position: 'bottom-left',
		})
		notification({
			message: 'hello notification component',
			duration: 0,
			title: '这是一个通知',
			position: 'bottom-left',
		})
		await asyncFn()
		expect(document.querySelectorAll('.yo-notification').length).toBe(2)
		notification.closeAll()
		await asyncFn()
		expect(document.querySelectorAll('.yo-notification').length).toBe(0)
	})

	test('notification offset', async () => {
		notification({
			message: 'hello notification component',
			duration: 100,
			title: '这是一个通知',
			position: 'bottom-left',
		})
		notification({
			message: 'hello notification component',
			duration: 50,
			title: '这是一个通知',
			position: 'bottom-left',
		})
		await asyncFn()
		const elements = document.querySelectorAll('.yo-notification')
		expect(elements.length).toBe(2)
		expect(getTopValue(elements[0])).toBe(20)
		expect(getTopValue(elements[0])).toBe(20)
	})
})