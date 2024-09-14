import { defineConfig } from 'vite';
import { last, split, first, includes } from 'lodash-es';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { build2rm } from '@yovy-ui/yovy-vite-plugin';

export default defineConfig({
	plugins: [
		dts({
			include: ['./**/*.ts'],
			exclude: ['./vite.config.ts'],
		}),
		build2rm({
			rmFiles: ['./dist'],
		})
	],
	build: {
		minify: false,
		lib: {
			entry: resolve(__dirname, './index.ts'),
			name: "hooks",
			fileName: 'index',
			formats: ['es'],
		},
		rollupOptions: {
			external: ['vue', 'lodash-es', 'vue3-i18n'],
			output: {
				manualChunks(id) {
					if (includes(id, '/packages/hooks/use')) {
						console.log('----', id);
						return first(split(last(split(id, '/')), '.'))
					}
				}
			}
		}
	}
})