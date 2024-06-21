export interface AlertProps {
	title: string,
	content: string,
	type: string,
	duration: number,
	showClose: boolean,
	center: boolean,
	closeOnClickModal: boolean,
	closeOnPressEscape: boolean,
}