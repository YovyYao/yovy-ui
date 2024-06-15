import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts'
import { readdirSync } from 'fs';
import { map, filter } from 'lodash-es';

function getDirectoriesSync(basePath: string) {
	const entries = readdirSync(basePath, { withFileTypes: true });
	return map(
		filter(entries, (entry) => entry.isDirectory()),
		(entry) => entry.name
	)
}

export default defineConfig({
	plugins: [
		vue(),
		dts({
			tsconfigPath: '../../tsconfig.build.json',
			outDir: "dist/types",
		}),
	],
	build: {
		outDir: 'dist/es',
		lib: {
			// 用户下载好后, 其使用的入口文件就是index.ts
			entry: resolve(__dirname, './index.ts'),
			name: 'YovyUI',
			fileName: 'index',
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
				assetFileNames: (chunkInfo) => {
					// 把style.css改名为index.css
					if (chunkInfo.name === 'style.css') return 'index.css';
					return chunkInfo.name as string;
				},
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return "vendor"
					}
					if (id.includes('/packages/hooks')) {
						return "hooks"
					}
					if (id.includes('/packages/utils') ||
						id.includes("plugin-vue:export-helper")
					) {
						return "utils"
					}
					for (const dirName of getDirectoriesSync("../components")) {
						if (id.includes(`/packages/components/${dirName}`)) {
							return dirName
						}
					}
				}
			},
		},
	},
})