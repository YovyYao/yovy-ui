// 基于rollup的生命周期钩子(buildStart和buildEnd)实现 ??? 
import { each, isFunction } from 'lodash-es';
import shell from 'shelljs'
/**
 * 基于rollup的钩子函数buildStart和buildEnd构建的插件. 通过each遍历文件并删除rmFiles数组中的文件, 并通过执行moveStyleFiles将指定文件移动到指定目的地
 * @param rmFiles 构建开始时删除的文件
 * @param beforeBuild 构建成功结束时调用. 使用lodash-es的each函数遍历rmFiles数组, 使用shelljs库的rm删除rmFiles数组中指定的文件, 然后根据参数对象中是否提供了beforeBuild函数来决定是否调用它
 * @param afterBuild 在构建开始时调用. 如果构建没有错误发生, 则根据参数对象中是否提供了afterBuild函数来决定是否调用它
 * @returns 一个拥有name, rollup的生命周期函数buildStart和buildEnd的对象, buildStart和buildEnd将会在构建时, 在合适的时机自动调用
 */
export function build2rm({
	rmFiles = [],
	beforeBuild,
	afterBuild,
}: {
	rmFiles?: string[],
	beforeBuild?: Function,
	afterBuild?: Function,
	}) {
	return {
		name: "build2rm",
		buildStart() {
			each(rmFiles, (fileName) => shell.rm('-rf', fileName))
			isFunction(beforeBuild) && beforeBuild()
		},
		buildEnd(error?: Error) {
			!error && isFunction(afterBuild) && afterBuild()
		}
	}
}
