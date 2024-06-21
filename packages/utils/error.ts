// 报错函数
import { isString } from 'lodash-es';

class YoUIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'YoUIError';
  }
}

/**
 * 
 * @param scope 错误作用域
 * @param message 提示消息
 */
export function throwError(scope: string, message: string): void {
	throw new YoUIError(`[${scope}]:${message}`);
}

/**
 * 热重载函数
 */
export function debugWarn(error: Error): void;
export function debugWarn(scope: string, message: string): void;
export function debugWarn(scope: string | Error, message?: string): void {
	// 在非生产环境中输出警告
  if (process.env.NODE_ENV !== 'production') {
    const error = isString(scope) ? new YoUIError(`[${scope}]:${message}`) : scope;
    console.warn(error);
  }
}