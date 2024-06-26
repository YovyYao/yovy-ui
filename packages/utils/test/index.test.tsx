// 测试
import { describe, expect, it } from 'vitest';
import { debugWarn, throwError, withInstall, makeInstaller, iconTypeMap } from '..';
import { each } from 'lodash-es';

describe('@yovy-ui/utils', () => {
	it('debugWarn should be exported', () => {
		expect(debugWarn).toBeDefined();
	})
	it('throwError should be exported', () => {
		expect(throwError).toBeDefined();
	})
	it('withInstall should be exported', () => {
		expect(withInstall).toBeDefined();
	})
	it('makeInstaller should be exported', () => {
		expect(makeInstaller).toBeDefined();
	})
	it('iconTypeMap should be exported', () => {
		expect(iconTypeMap).toBeDefined();
		each(
			[
				["info", "circle-info"],
				["success", "check-circle"],
				["warning", "circle-exclamation"],
				["error", "circle-xmark"],
				["danger", "circle-xmark"],
			],
			([type, icon]) => {
				expect(iconTypeMap.get(type)).toBe(icon);
			}
		)
	})
});