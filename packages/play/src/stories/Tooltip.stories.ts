import type { StoryObj, Meta } from '@storybook/vue3';

import { fn } from '@storybook/test';
import { YoTooltip } from 'yovy-ui';
import 'yovy-ui/dist/theme/Tooltip.css'

type Story = StoryObj<typeof YoTooltip>

const meta: Meta<typeof YoTooltip> = {
	title: 'Components/Tooltip',
	component: YoTooltip,
	argTypes: {
		content: {
			control: 'text',
			description: 'Content of the tooltip',
			defaultValue: 'Tooltip content',
		},
		trigger: {
			control: {
				type: "select"
			},
			options: ['hover', 'click', 'contextmenu'],
		},
		placement: {
			control: {
				type: 'select'
			},
			options: ['top', 'bottom', 'left', 'right'],
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the tooltip',
			defaultValue: false,
		},
	},
	args: {
		'onVisibleChange': fn()
	},
}

export const Default: Story = {
	args: {
		content: 'this is a tooltip',
		placement: 'top',
		trigger: 'hover',
	},
	render: (args) => ({
		components: { YoTooltip },
		setup() {
			return args
		},
		template: `
		<yo-tooltip
			class="yo-tooltip" 
			:content="content"
			:placement="placement"
			:trigger="trigger"
			@visibleChange="onVisibleChange"
			data-testid="story-test-tooltip"
		>
			<button>Hover me</button>
		</yo-tooltip>
		`
	})
}
export default meta