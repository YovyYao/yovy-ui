import { default as en } from './lang/en';
import { default as jp } from './lang/jp';
import { default as kr } from './lang/kr';
import { default as zhCN } from './lang/zh-cn';
import { default as zhTW } from './lang/zh-tw';

export type TranslatePair = {
	[key: string]: string | string[] | TranslatePair
}

export type Language = {
	name: string
	el: TranslatePair
}