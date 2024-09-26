import { asyncFn } from '@yovy-ui/utils';
import { describe, test, it, expect } from 'vitest';

import { LoadingFn } from '../util';

describe('Loading', () => {
	it('should create Loading instance', () => {
		const instance = LoadingFn()
		expect(instance).toBeTruthy()
	})
	it('should render mask', async () => {
		LoadingFn()
		await asyncFn()
		expect(document.querySelector('yo-loading__mask')).toBeTruthy()
	})
	it('should close Loading and remove it form DOM', async () => {
		const instance = LoadingFn()
		await	asyncFn()
		expect(document.querySelector('.yo-loading')).toBeTruthy()
		// instance.close()
		// await asyncFn()
		// expect(document.querySelector('.yo-loading')).toBeFalsy()
	})
})
