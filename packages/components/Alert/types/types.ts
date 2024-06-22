export type AlertType = 'success' | 'info' | 'warning' | 'error' | 'danger'

export interface AlertProps {
	title?: string,
	type?: string,
	description?: string,
	effect?: "light" | "dark",
	closable?: boolean,
	center?: boolean,
	showIcon?: boolean,
}

// YoAlert的事件
export interface AlertEmits {
	(e: "close"): void
}

