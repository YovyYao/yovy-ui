// YoAlert可以修改的颜色
export type AlertType = 'success' | 'info' | 'warning' | 'error' | 'danger'

// YoAlert的props属性
export interface AlertProps {
	title?: string,
	type?: string,
	description?: string,
	effect?: "light" | "dark",
	closable?: boolean,
	center?: boolean,
	showIcon?: boolean,
}

// YoAlert可以触发的事件(用户层面可点击"x"关闭YoAlert)
export interface AlertEmits {
	(e: "close"): void
}

// YoAlert的实例对象(YoAlert组件内部需要调用, 也可以通过实例对象调用)
export interface AlertInstance {
	open: () => void
	close: () => void
}

