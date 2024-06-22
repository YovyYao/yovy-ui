import type { StoryObj, Meta, ArgTypes } from '@storybook/vue3';
import { ref, watch } from 'vue';
import { fn } from '@storybook/test';
import { YoAlert, type AlertInstance } from 'yovy-ui';
import 'yovy-ui/dist/theme/Alert.css';

type Story = StoryObj<typeof YoAlert> & { argTypes?: ArgTypes };

const meta: Meta<typeof YoAlert> = {
  title: 'Components/Alert',
	component: YoAlert,
	tags: ["autodocs"],
  argTypes: {
    type: {
			control: { type: 'select' },
			options: ['success', 'info', 'warning', 'error', 'danger'],
		},
		effect: {
			control: { type: 'select' },
			options: ['light', 'dark'],
		},
		center: {
			control: {
				type: 'boolean',
			},
		},
	},
	args: {
		onClose: fn()
	}
}

export const Default: Story & { args: { visible: boolean } } = {
	args: {
		title: "Title",
		description: "this is a description for YoAlert",
		type: "success",
		effect: "light",
		closable: true,
		showIcon: true,
		visible: false,
	},
	render: (args) => ({
		components: { YoAlert },
		setup() {
			const alertRef = ref<AlertInstance>();
			const a = ref()
			watch(
				() => (args as any).visible,
				(value: boolean) => {
					if (value) {
						alertRef.value?.open()
					} else {
						alertRef.value?.close()
					}
				}
			)
			return { args, alertRef, a }
		},
		template: `
			<yo-alert ref="alertRef" v-bind="args"></yo-alert>
			<div ref="a">666</div>
		`,
	}),
}

export default meta;