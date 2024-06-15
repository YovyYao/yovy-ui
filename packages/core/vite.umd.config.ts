import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
	plugins: [vue()],
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
					// 把style.css改名为index.css
					if (chunkInfo.name === 'style.css') return 'index.css';
					return chunkInfo.name as string;
				},
			},
		},
	},
})