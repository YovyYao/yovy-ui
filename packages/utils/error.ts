// 自定义错误
import { isString } from 'lodash-es';

class YoUIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'YoUIError';
  }
}

/**
 * 创建一个YoUIError自定义错误对象
 * @param scope 错误能够发生的作用域
 * @param message 错误信息
 * @returns 使用YoUIError类创建一个自定义错误对象
 */
function createYoUIError(scope: string, message: string) {
  return new YoUIError(`[${scope}]:${message}`);
}

/**
 * 爆出自定义错误
 * @param scope 错误作用域
 * @param message 提示消息
 */
export function throwError(scope: string, message: string): void {
	throw createYoUIError(scope, message)
}

/**
 * 函数重载
 */
export function debugWarn(error: Error): void;
export function debugWarn(scope: string, message: string): void;
export function debugWarn(scope: string | Error, message?: string): void {
	// 在非生产环境中输出警告
  if (process.env.NODE_ENV !== 'production') {
    const error = isString(scope) ? createYoUIError(scope, message!) : scope;
    console.warn(error);
  }
}