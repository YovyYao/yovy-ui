import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdir, readdirSync } from 'fs';
import { map, filter, delay, includes, defer } from 'lodash-es';
// import { build2rm } from './build2rm';
// import { build2rm } from '@yovy-ui/hooks';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import shell from 'shelljs';
import terser from '@rollup/plugin-terser';

import { build2rm } from '@yovy-ui/yovy-vite-plugin';

const MOVE_STYLE_FILES_DELAY = 1000 as const

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

// const isProd = import.meta.env.MODE === 'production'
// const isDev = import.meta.env.MODE === 'development'

/**
 * 同步获取指定路径下的所有目录名. 使用readdirSync方法读取该路径下的所有文件和目录. 
 * 通过filter方法过滤出所有目录类型的条目, 并使用map方法将这些条目的名称提取出来, 
 * 最终返回一个包含所有目录名的数组
 * @param basePath 想获取目录名的父目录路径
 * @returns 
 */
function getDirectoriesSync(basePath: string) {
	const entries = readdirSync(basePath, { withFileTypes: true });
	return map(
		filter(entries, (entry) => entry.isDirectory()),
		(entry) => entry.name
	)
}

/**
 * 移动样式文件到指定目录. 读取./dist/es/theme下的文件, 并将其移动到./dist文件夹
 */
function moveStyleFiles() {
	readdir('./dist/es/theme', error => {
		if (error) return delay(moveStyleFiles, MOVE_STYLE_FILES_DELAY)
		defer(() => shell.mv("./dist/es/theme", "./dist"))
	})
}

export default defineConfig({
	plugins: [
		vue(),
		dts({
			// 基于tsconfig.build.json生成dts文件
			tsconfigPath: '../../tsconfig.build.json',
			// 输出目录
			outDir: "dist/types",
		}),
		build2rm({
			rmFiles: ["./dist/es", "./dist/theme", "./dist/types"],
			afterBuild: moveStyleFiles,
		}),
		// 第三方插件实现代码的压缩, 格式化, 混淆
		terser({
			// 代码压缩
			compress: {
				// 启用序列化压缩，例如将多个succeeding statements合并成一个
				sequences: isProd,
				// 对函数参数进行重命名
				arguments: isProd,
				// 删除console.log等调试语句
				// drop_console: isProd && ["log"],
				// 删除debugger语句
				drop_debugger: isProd,
				// 压缩的轮数，更多轮数可能带来更小的体积，但也增加构建时间
				passes: isProd ? 3 : 1,
				// 全局定义替换，用于定义在压缩过程中需要替换的全局变量值
				global_defs: {
					"@DEV": JSON.stringify(isDev),
					"@PROD": JSON.stringify(isProd),
					"@TEST": JSON.stringify(isTest),
				},
			},
			// 控制输出的代码的格式
			format: {
				// 是否添加分号
				semicolons: false,
				// 使用简写形式
				shorthand: isProd,
				// 使用大括号，即使在单行if语句中
				braces: !isProd,
				// 美化输出代码，使其更易于阅读
				beautify: !isProd,
				// 控制如何处理注释，可以是布尔值或函数
				comments: !isProd,
			},
			// 代码混淆
			// mangle: {
			// 	// 对顶级作用域的变量和函数名进行混淆
			// 	toplevel: isProd,
			// 	// 如果代码中包含eval，则需要开启此选项以正确处理
			// 	eval: isProd,
			// 	// 保留类名和函数名不被混淆
			// 	keep_classnames: isProd,
			// 	// 保留所有函数名不被混淆
			// 	keep_fnames: isDev,
			// },
		}),
	],
	build: {
		// 输出目录
		outDir: 'dist/es',
		// 允许CSS从JS中分离
		cssCodeSplit: true,
		// 禁用默认的代码压缩
		minify: false,
		// 库的构建配置
		lib: {
			// 用户下载好后, 其使用的入口文件就是index.ts
			entry: resolve(__dirname, './index.ts'),
			// 库名
			name: 'YovyUI',
			// 输出文件名
			fileName: 'index',
			// 输出ES模块格式的文件
			formats: ['es'],
		},
		rollupOptions: {
			// 配置外部依赖，这些依赖将不会被打包进库文件，需要用户额外下载。
			external: [
				'vue',
				'@fortawesome/fontawesome-svg-core',
				'@fortawesome/free-solid-svg-icons',
				'@fortawesome/vue-fontawesome',
				'@popperjs/core',
				'async-validator',
			],
			output: {
				// 控制非JavaScript模块（如CSS、图片等静态资源）的文件命名规则
				assetFileNames: (chunkInfo) => {
					// console.log('es assetFileNames', chunkInfo);
					// style.css合并到产物index.css
					if (chunkInfo.name === 'style.css') {
						return 'index.css';
					}
					// 为了能够让每个组件及其样式都能按需引入
					// 将asset类型的文件保存到dist/theme文件夹下, 并保持原文件名和扩展名
					if (chunkInfo.type === 'asset' && /\.(css)$/i.test(chunkInfo.name as string)) {
						return 'theme/[name].[ext]'
					}
					return chunkInfo.name as string;
				},
				// 手动控制代码分割，根据模块id决定哪些模块应该被打包到一起
				manualChunks(id) {
					// 将node_modules中的模块打包到一起, 合并到vendor中
					if (id.includes('node_modules')) {
						return "vendor"
					}
					// 将/packages/hooks合并到hooks中
					if (id.includes('/packages/hooks')) {
						return "hooks"
					}
					// 将/packages/utils合并到utils中
					if (
						id.includes('/packages/utils') ||
						id.includes("plugin-vue:export-helper")
					) {
						return "utils"
					}
					for (const dirName of getDirectoriesSync("../components")) {
						if (includes(id, `/packages/components/${dirName}`)) {
							return dirName
						}
					}
				}
			},
		},
	},
})