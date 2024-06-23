import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Yovy-Plus",
  description: "Easy components for coder",
  base: "/yovy-ui/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始使用', link: '../get-started.md' },
      { text: '组件', link: './components/button' }
    ],
    search: {
      provider: 'local',
    },
    sidebar: [
      {
        text: '指南',
        collapsed: false,
        items: [
          { text: '快速开始', link: '../get-started.md' },
        ],
      },
      {
        text: '组件',
        collapsed: false,
        items: [
          { text: 'Alert', link: '/components/alert' },
          { text: 'Button', link: '/components/button' },
          { text: 'Collapse', link: '/components/collapse' },
          { text: 'Icon', link: '/components/icon' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/YovyYao/yovy-ui' }
    ]
  },
  markdown: {
    config: md => {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
})
