import { defineConfig } from 'vite'
import * as path from 'path'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${process.env.APP_NAME ?? path.basename(__dirname)}` : '',
  css: {
    preprocessorOptions: { scss: { additionalData: `@import "./src/styles/vars.scss";` } },
  },
  esbuild: { minifySyntax: true, minifyWhitespace: true, target: 'es2015' },
}))
