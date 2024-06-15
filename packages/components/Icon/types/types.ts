import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface IconProps {
	border?: boolean;
	fixedWidth?: boolean;
	flip?: 'horizontal' | 'vertical' | 'both';
	pulse?: boolean;
	pull?: 'right' | 'left';
	icon: object | Array<string> | string | IconDefinition;
	mask?: object | Array<string> | string;
	listItem?: boolean;
	rotation?: 90 | 180 | 270 | "90" | "180" | "270";
	swapOpacity?: boolean;
	size?: 'lg' | 'xs' | 'sm' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x'
	spin?: boolean;
	transform?: string | object;
	symbol?: string | boolean;
	title?: string;
	inverse?: boolean;
	bounce?: boolean;
	shake?: boolean;
	beat?: boolean;
	fade?: boolean;
	beatFade?: boolean;
	spinPulse?: boolean;
	spinReverse?: boolean;
	type?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
	color?: string;
}