// vite.es.config.ts
import { defineConfig } from "file:///D:/YovysProject/yovy-ui/node_modules/.pnpm/vite@5.1.4_@types+node@20.11.20/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import vue from "file:///D:/YovysProject/yovy-ui/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.4_@types+node@20.11.20__vue@3.4.27_typescript@5.2.2_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import dts from "file:///D:/YovysProject/yovy-ui/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@20.11.20_rollup@4.18.0_typescript@5.4.5_vite@5.2.13_@types+node@20.11.20_/node_modules/vite-plugin-dts/dist/index.mjs";
import { readdirSync } from "fs";
import { map, filter } from "file:///D:/YovysProject/yovy-ui/node_modules/.pnpm/lodash-es@4.17.21/node_modules/lodash-es/lodash.js";
var __vite_injected_original_dirname = "D:\\YovysProject\\yovy-ui\\packages\\core";
function getDirectoriesSync(basePath) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}
var vite_es_config_default = defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types"
    })
  ],
  build: {
    outDir: "dist/es",
    lib: {
      // 用户下载好后, 其使用的入口文件就是index.ts
      entry: resolve(__vite_injected_original_dirname, "./index.ts"),
      name: "YovyUI",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      // 配置外部依赖，这些依赖将不会被打包进库文件，需要用户额外下载。
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator"
      ],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css")
            return "index.css";
          return chunkInfo.name;
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (id.includes("/packages/utils") || id.includes("plugin-vue:export-helper")) {
            return "utils";
          }
          for (const dirName of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${dirName}`)) {
              return dirName;
            }
          }
        }
      }
    }
  }
});
export {
  vite_es_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5lcy5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxZb3Z5c1Byb2plY3RcXFxceW92eS11aVxcXFxwYWNrYWdlc1xcXFxjb3JlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxZb3Z5c1Byb2plY3RcXFxceW92eS11aVxcXFxwYWNrYWdlc1xcXFxjb3JlXFxcXHZpdGUuZXMuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Zb3Z5c1Byb2plY3QveW92eS11aS9wYWNrYWdlcy9jb3JlL3ZpdGUuZXMuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcclxuaW1wb3J0IHsgcmVhZGRpclN5bmMgfSBmcm9tICdmcyc7XHJcbmltcG9ydCB7IG1hcCwgZmlsdGVyIH0gZnJvbSAnbG9kYXNoLWVzJztcclxuXHJcbmZ1bmN0aW9uIGdldERpcmVjdG9yaWVzU3luYyhiYXNlUGF0aDogc3RyaW5nKSB7XHJcblx0Y29uc3QgZW50cmllcyA9IHJlYWRkaXJTeW5jKGJhc2VQYXRoLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSk7XHJcblx0cmV0dXJuIG1hcChcclxuXHRcdGZpbHRlcihlbnRyaWVzLCAoZW50cnkpID0+IGVudHJ5LmlzRGlyZWN0b3J5KCkpLFxyXG5cdFx0KGVudHJ5KSA9PiBlbnRyeS5uYW1lXHJcblx0KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG5cdHBsdWdpbnM6IFtcclxuXHRcdHZ1ZSgpLFxyXG5cdFx0ZHRzKHtcclxuXHRcdFx0dHNjb25maWdQYXRoOiAnLi4vLi4vdHNjb25maWcuYnVpbGQuanNvbicsXHJcblx0XHRcdG91dERpcjogXCJkaXN0L3R5cGVzXCIsXHJcblx0XHR9KSxcclxuXHRdLFxyXG5cdGJ1aWxkOiB7XHJcblx0XHRvdXREaXI6ICdkaXN0L2VzJyxcclxuXHRcdGxpYjoge1xyXG5cdFx0XHQvLyBcdTc1MjhcdTYyMzdcdTRFMEJcdThGN0RcdTU5N0RcdTU0MEUsIFx1NTE3Nlx1NEY3Rlx1NzUyOFx1NzY4NFx1NTE2NVx1NTNFM1x1NjU4N1x1NEVGNlx1NUMzMVx1NjYyRmluZGV4LnRzXHJcblx0XHRcdGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJy4vaW5kZXgudHMnKSxcclxuXHRcdFx0bmFtZTogJ1lvdnlVSScsXHJcblx0XHRcdGZpbGVOYW1lOiAnaW5kZXgnLFxyXG5cdFx0XHRmb3JtYXRzOiBbJ2VzJ10sXHJcblx0XHR9LFxyXG5cdFx0cm9sbHVwT3B0aW9uczoge1xyXG5cdFx0XHQvLyBcdTkxNERcdTdGNkVcdTU5MTZcdTkwRThcdTRGOURcdThENTZcdUZGMENcdThGRDlcdTRFOUJcdTRGOURcdThENTZcdTVDMDZcdTRFMERcdTRGMUFcdTg4QUJcdTYyNTNcdTUzMDVcdThGREJcdTVFOTNcdTY1ODdcdTRFRjZcdUZGMENcdTk3MDBcdTg5ODFcdTc1MjhcdTYyMzdcdTk4OURcdTU5MTZcdTRFMEJcdThGN0RcdTMwMDJcclxuXHRcdFx0ZXh0ZXJuYWw6IFtcclxuXHRcdFx0XHQndnVlJyxcclxuXHRcdFx0XHQnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJyxcclxuXHRcdFx0XHQnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJyxcclxuXHRcdFx0XHQnQGZvcnRhd2Vzb21lL3Z1ZS1mb250YXdlc29tZScsXHJcblx0XHRcdFx0J0Bwb3BwZXJqcy9jb3JlJyxcclxuXHRcdFx0XHQnYXN5bmMtdmFsaWRhdG9yJyxcclxuXHRcdFx0XSxcclxuXHRcdFx0b3V0cHV0OiB7XHJcblx0XHRcdFx0YXNzZXRGaWxlTmFtZXM6IChjaHVua0luZm8pID0+IHtcclxuXHRcdFx0XHRcdC8vIFx1NjI4QXN0eWxlLmNzc1x1NjUzOVx1NTQwRFx1NEUzQWluZGV4LmNzc1xyXG5cdFx0XHRcdFx0aWYgKGNodW5rSW5mby5uYW1lID09PSAnc3R5bGUuY3NzJykgcmV0dXJuICdpbmRleC5jc3MnO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGNodW5rSW5mby5uYW1lIGFzIHN0cmluZztcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdG1hbnVhbENodW5rcyhpZCkge1xyXG5cdFx0XHRcdFx0aWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gXCJ2ZW5kb3JcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKGlkLmluY2x1ZGVzKCcvcGFja2FnZXMvaG9va3MnKSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gXCJob29rc1wiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoaWQuaW5jbHVkZXMoJy9wYWNrYWdlcy91dGlscycpIHx8XHJcblx0XHRcdFx0XHRcdGlkLmluY2x1ZGVzKFwicGx1Z2luLXZ1ZTpleHBvcnQtaGVscGVyXCIpXHJcblx0XHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIFwidXRpbHNcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Zm9yIChjb25zdCBkaXJOYW1lIG9mIGdldERpcmVjdG9yaWVzU3luYyhcIi4uL2NvbXBvbmVudHNcIikpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGlkLmluY2x1ZGVzKGAvcGFja2FnZXMvY29tcG9uZW50cy8ke2Rpck5hbWV9YCkpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZGlyTmFtZVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHR9LFxyXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVQsU0FBUyxvQkFBb0I7QUFDOVUsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sU0FBUztBQUNoQixPQUFPLFNBQVM7QUFDaEIsU0FBUyxtQkFBbUI7QUFDNUIsU0FBUyxLQUFLLGNBQWM7QUFMNUIsSUFBTSxtQ0FBbUM7QUFPekMsU0FBUyxtQkFBbUIsVUFBa0I7QUFDN0MsUUFBTSxVQUFVLFlBQVksVUFBVSxFQUFFLGVBQWUsS0FBSyxDQUFDO0FBQzdELFNBQU87QUFBQSxJQUNOLE9BQU8sU0FBUyxDQUFDLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFBQSxJQUM5QyxDQUFDLFVBQVUsTUFBTTtBQUFBLEVBQ2xCO0FBQ0Q7QUFFQSxJQUFPLHlCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTO0FBQUEsSUFDUixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsTUFDSCxjQUFjO0FBQUEsTUFDZCxRQUFRO0FBQUEsSUFDVCxDQUFDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBO0FBQUEsTUFFSixPQUFPLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQ3RDLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDZjtBQUFBLElBQ0EsZUFBZTtBQUFBO0FBQUEsTUFFZCxVQUFVO0FBQUEsUUFDVDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ1AsZ0JBQWdCLENBQUMsY0FBYztBQUU5QixjQUFJLFVBQVUsU0FBUztBQUFhLG1CQUFPO0FBQzNDLGlCQUFPLFVBQVU7QUFBQSxRQUNsQjtBQUFBLFFBQ0EsYUFBYSxJQUFJO0FBQ2hCLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUNoQyxtQkFBTztBQUFBLFVBQ1I7QUFDQSxjQUFJLEdBQUcsU0FBUyxpQkFBaUIsR0FBRztBQUNuQyxtQkFBTztBQUFBLFVBQ1I7QUFDQSxjQUFJLEdBQUcsU0FBUyxpQkFBaUIsS0FDaEMsR0FBRyxTQUFTLDBCQUEwQixHQUNyQztBQUNELG1CQUFPO0FBQUEsVUFDUjtBQUNBLHFCQUFXLFdBQVcsbUJBQW1CLGVBQWUsR0FBRztBQUMxRCxnQkFBSSxHQUFHLFNBQVMsd0JBQXdCLE9BQU8sRUFBRSxHQUFHO0FBQ25ELHFCQUFPO0FBQUEsWUFDUjtBQUFBLFVBQ0Q7QUFBQSxRQUNEO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
