import path from 'path'
import Inspect from 'vite-plugin-inspect'
import { defineConfig } from 'vite'
import { projRoot } from './.vitepress/utils/paths'
import type { Alias } from 'vite'

// 设置路径别名
const alias: Alias[] = []
if (process.env.DOC_ENV !== 'production') {
  alias.push(
    {
      find: /^element-plus(\/(es|lib))?$/,
      replacement: path.resolve(projRoot, 'packages/element-plus/index.ts'),
    },
    {
      find: /^element-plus\/(es|lib)\/(.*)$/,
      replacement: `${path.resolve(projRoot, 'packages')}/$2`,
    }
  )
}

export default defineConfig({
  server: {
    host: true,
    fs: {
      strict: true,
      allow: [projRoot],
    },
  },
  resolve: {
    alias,
  },
  plugins: [Inspect()], // 检查 Vite 插件的中间状态
  optimizeDeps: {
    // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
    include: [
      'vue',
      'markdown-it',
      'clipboard-copy',
      '@vueuse/core',
      'axios',
      'nprogress',
      '@element-plus/icons-vue',
      'dayjs',
      'memoize-one',
      'async-validator',
      'lodash',
      '@popperjs/core',
      'normalize-wheel-es',
    ],
  },
})
