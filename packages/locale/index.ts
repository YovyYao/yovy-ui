export { default as en } from './lang/en';
export { default as jp } from './lang/jp';
export { default as kr } from './lang/kr';
export { default as zhCN } from './lang/zh-cn';
export { default as zhTW } from './lang/zh-tw';

export type TranslatePair = {
	[key: string]: string | string[] | TranslatePair
}

export type Language = {
	name: string
	el: TranslatePair
}