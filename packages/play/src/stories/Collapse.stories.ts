import type { Meta, StoryObj, ArgTypes } from '@storybook/vue3';
import { userEvent, within, expect, fn, clearAllMocks } from '@storybook/test';
import { set } from 'lodash-es';

import { YoCollapse, YoCollapseItem } from 'yovy-ui';
import 'yovy-ui/dist/theme/Collapse.css'

type Story = StoryObj<typeof YoCollapse> & { argsTypes?: ArgTypes };

const meta: Meta<typeof YoCollapse> = {
	title: "Components/Collapse",
	component: YoCollapse,
	subcomponents: { YoCollapseItem },
	tags: ["autodocs"],
	argTypes: {
		accordion: {
			control: { type: 'boolean' }
		},
		modelValue: {
			control: { type: 'object' }
		},
	},
	// args: { click: fn() },
}

export const Default: Story = {
	args: {
		accordion: false,
		modelValue: ['b']
  },
	render: (args) => ({
		components: {
			YoCollapse,
			YoCollapseItem,
		},
		setup() {
			return {
				args,
			};
		},
		template: `
			<yo-collapse :modelValue="[]" data-testid="story-test-collapse">
				<yo-collapse-item title="title a" name="a">
					<div>content a</div>
				</yo-collapse-item>
				<yo-collapse-item title="title b" name="b">
					<div>content b</div>
				</yo-collapse-item>
				<yo-collapse-item title="title c ❌" name="c" disabled>
					<div>content c</div>
				</yo-collapse-item>
				<yo-collapse-item title="title d" name="d">
					<div>content d</div>
				</yo-collapse-item>
			</yo-collapse>
		`,
	}),

  play: async ({ canvasElement, args, step }) => {
		const canvas = within(canvasElement)
		const collapse = canvas.getByTestId('story-test-collapse')

		await step(
			"测试手风琴模式",
			async () => {
				set(args, "accordion", true)
				await userEvent.tripleClick(collapse)
				// expect(atgs.onClick)
				clearAllMocks()
			}
		)
	}
}

export default meta