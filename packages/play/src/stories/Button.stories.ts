import type { Meta, StoryObj, ArgTypes } from '@storybook/vue3';
import { fn, within, userEvent, expect, clearAllMocks } from '@storybook/test';

import {
  YoButton,
  YoButtonGroup
} from 'yovy-ui';
import { set } from 'lodash-es';

type Story = StoryObj<typeof YoButton> & { argsTypes?: ArgTypes };

const meta: Meta<typeof YoButton> = {
	title: 'Example/Button',
  component: YoButton,
  tags: ["autodocs"],
	argTypes: {
		type: {
			control: { type: 'select' },
			options: ['primary', 'success', 'warning', 'danger', 'info'],
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    useThrottle: {
      control: { type: 'boolean' },
    },
    throttleDuration: {
      control: { type: 'number' },
    },
    autofocus: {
      control: { type: 'boolean' },
    },
    tag: {
      control: { type: 'text' },
    },
    nativeType: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    icon: {
      control: { type: 'text' },
    },
    loadingIcon: {
      control: { type: 'text' },
    },
    plain: {
      control: { type: 'boolean' },
    },
    round: {
      control: { type: 'boolean' },
    },
    circle: {
      control: { type: 'boolean' },
    },
  },
  args: { onClick: fn()},
}

/**
 * 创建一个包含指定内容的HTML元素。
 * 
 * 该函数通过返回一个包含在<div>标签中的字符串来创建一个简单的HTML容器。
 * <div>标签被设置了一个固定的样式，包括5px的外边距，以提供基本的布局。
 * 使用者可以通过传递任何字符串作为参数来定制容器内的内容。
 * 
 * @param val 要包含在容器中的内容，通常是一个字符串。
 * @returns 返回一个格式化的HTML字符串，该字符串包含用户指定的内容。
 */
const container = (val: string) => `
  <div style="margin:5px">
    ${val}
  </div>
`

export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: 'text' },
    },
  },
  args: {
    type: "primary",
    content: 'Button',
  },
  render: (args) => ({
    components: { YoButton },
    setup() {
      return { args }
    },
    template: container(`
      <yo-button data-testid="story-test-btn" :type="args.type" v-bind="args">
        {{ args.content }}
      </yo-button>`
    )
  }),

  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByTestId('story-test-btn')
    /**
     * 此函数是一个异步函数，它作为参数传递给step函数。
     * 在函数内部，它首先通过set函数将useThrottle参数设置为true。
     * 然后，它使用await等待userEvent.tripleClick(btn)执行，模拟用户快速连续点击按钮三次。
     * 接下来，它使用expect函数断言args.onClick方法被调用了一次。
     * 最后，它调用clearAllMocks函数清除所有模拟函数的调用信息。
     * 这个函数的作用是测试当useThrottl参数为true时，onClick方法是否只能被调用一次。
     */
    await step(
      "When useThrottl is set be true, the conClick can be called once",
      async () => {
        set(args, "useThrottle", true)
        await userEvent.tripleClick(btn)
        expect(args.onClick).toHaveBeenCalledOnce()
        clearAllMocks()
      }
    )

    await step(
      "When useThrottl is set be false, the conClick can be called three times",
      async () => {
        set(args, "useThrottle", false)
        await userEvent.tripleClick(btn)
        expect(args.onClick).toHaveBeenCalledTimes(3)
        clearAllMocks()
      }
    )

    await step(
      "When disabled is set be true, the conClick can not be called",
      async () => {
        set(args, "disabled", true)
        await userEvent.click(btn)
        expect(args.onClick).toHaveBeenCalledTimes(0)
        set(args, "disabled", false)
        clearAllMocks()
      }
    )

    await step(
      "When loading is set be true, the conClick can not be called",
      async () => {
        set(args, "loading", true)
        await userEvent.click(btn)
        expect(args.onClick).toHaveBeenCalledTimes(0)
        set(args, "loading", false)
        clearAllMocks()
      }
    )
  },
}

export const Autofocus: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: {
        type: "text",
      },
    },
  },
  args: {
    content: "Button",
    autofocus: true,
  },
  render: (args) => ({
    components: { YoButton },
    setup() {
      return { args }
    },
    template: container(`
      <p>Please refresh the browser in order to make the button to get focus </p>
      <yo-button data-testid="story-test-btn" v-bind="args">
        {{args.content}}
      </yo-button>`
    )
  }),
  play: async ({ args }) => {
    await userEvent.keyboard("{enter}")
    expect(args.onClick).toHaveBeenCalledOnce()
    clearAllMocks()
  }
}

export const Circle: Story = {
  args: {
    icon: "search",
  },
  render: (args) => ({
    components: { YoButton },
    setup() {
      return { args }
    },
    template: container(`
      <yo-button circle v-bind="args" />
    `)
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step("click button", async () => {
      await userEvent.click(canvas.getByRole("button"))
    })
    expect(args.onClick).toHaveBeenCalled()
    clearAllMocks()
  }
}

export const Group: Story & { args: { content1: string, content2: string, content3: string } } = {
  argTypes: {
    content: {
      control: {
        type: "text"
      }
    }
  },
  args: {
    content1: "Button1",
    content2: "Button2",
    content3: "Button3",
  },
  render: (args) => ({
    components: { YoButton, YoButtonGroup },
    setup() {
      return { args }
    },
    template: container(`
    <yo-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
      <yo-button v-bind="args">{{args.content1}}</yo-button>
      <yo-button v-bind="args">{{args.content2}}</yo-button>
      <yo-button v-bind="args">{{args.content3}}</yo-button>
    </yo-button-group>
    `)
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step("click btn1", async () => {
      await userEvent.click(canvas.getByText("Button1"))
    })
    await step("click btn2", async () => {
      await userEvent.click(canvas.getByText("Button2"))
    })
    await step("click btn3", async () => {
      await userEvent.click(canvas.getByText("Button3"))
    })
    expect(args.onClick).toHaveBeenCalled()
  }
}

export default meta