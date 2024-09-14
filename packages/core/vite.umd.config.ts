import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { delay } from 'lodash-es';
import { build2rm } from './build2rm';
// import { build2rm } from '@yovy-ui/hooks';
import vue from '@vitejs/plugin-vue';
import shell from 'shelljs';
import terser from '@rollup/plugin-terser'

const MOVE_STYLE_FILES_DELAY = 1000 as const

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

// const isProd = import.meta.env.MODE === 'production'
// const isDev = import.meta.env.MODE === 'development'

/**
 * 读取./dist/umd/index.css.gz文件, 并将./dist/umd/index.css文件移动到./dist/index.css. 
 * 将全局引入的全局样式移动到dist/index.css. 该样式是全局引入样式
 */
function moveStyleFiles() {
	try {
		readFileSync('./dist/umd/index.css.gz')
		shell.cp('./dist/umd/index.css', './dist/index.css')
	} catch (error) {
		delay(moveStyleFiles, MOVE_STYLE_FILES_DELAY)
	}
}

export default defineConfig({
	plugins: [
		vue(),
		/**
		 * 压缩.cjs和.css文件, 产物为.cjs.gz和.css.gz
		 * @see https://github.com/vbenjs/vite-plugin-compression2
		 */
		compression({
			include: /.(cjs|css)$/i,
		}),
		build2rm({
			rmFiles: ['./dist/umd', './dist/index.css'],
			afterBuild: moveStyleFiles
		}),
		terser({
			compress: {
				drop_console: ['log'],
				drop_debugger: true,
				passes: 3,
				global_defs: {
					"@DEV": JSON.stringify(isDev),
					"@PROD": JSON.stringify(isProd),
					"@TEST": JSON.stringify(isTest),
				},
			},
		}),
	],
	build: {
		// 设置了输出目录为dist/umd
		outDir: 'dist/umd',
		// 在lib对象中，设置了入口文件为./index.ts
		lib: {
			entry: resolve(__dirname, './index.ts'),
			// 库名为YovyUI
			name: 'YovyUI',
			// 输出文件名为index
			fileName: 'index',
			// 格式为UMD
			formats: ['umd'],
		},
		rollupOptions: {
			// 设置了外部依赖为vue
			external: ['vue'],
			output: {
				exports: 'named',
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				// 为vue设置了全局变量Vue
				globals: {
					vue: 'Vue',
				},
				assetFileNames: (chunkInfo) => {
					// console.log('umd', chunkInfo.name);
					// 把style.css改名为index.css
					if (chunkInfo.name === 'style.css') {
						return 'index.css'
					}
					return chunkInfo.name as string;
				},
			},
		},
	},
})