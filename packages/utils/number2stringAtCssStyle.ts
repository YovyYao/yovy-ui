import { isNumber, isString } from 'lodash-es';
import { debugWarn } from './error';

const SCOPE = 'utils/number2stringAtCssStyle' as const

/**
 * 判断value是否为带有Number的String. 接受一个string类型的参数, 判断这个参数是否带有Number. value首先就要满足是一个string类型的参数, 才能进行下一步判断.
 * @param value 需要判断的字符串
 * @returns boolean
 */
const isStringWithNumber = (value: string):boolean => {
	if (!isString(value)) {
		return false
	}
	return true
}

/**
 * 为纯数字的value添加一个单位.
 * @param value 需要判断的字符串
 * @param defaultUnit 默认单位. 
 */
export const addUnit = (value?: string | number, defaultUnit = 'px') => {
	if (!value) return ''
	if (isNumber(value) || isStringWithNumber(value)) {
		return `${value}${defaultUnit}`
	}
	if (isString(value)) {
		return value
	}
	debugWarn(SCOPE, 'binding value must be a string or number')
}
