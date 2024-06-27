import { describe, it, expect } from 'vitest';
import { get, map } from 'lodash-es';
import {
	YoAlert,
	YoButton,
	YoButtonGroup,
	YoCollapse,
	YoCollapseItem,
	YoIcon,
} from '../'
import type { Plugin } from 'vue';

const components = [
	YoAlert,
	YoButton,
	YoButtonGroup,
	YoCollapse,
	YoCollapseItem,
	YoIcon,
] as Plugin[]

describe('@yovy-ui/components', () => {
	it.each(map(components, (c) => [get(c, 'name') ?? '', c]))(
		'%s should be exported',
		(_, c) => {
			expect(c).toBeDefined()
			expect(c.install).toBeDefined()
		}
	)
})