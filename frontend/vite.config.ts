import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    assetsInlineLimit: 0,
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  define: {
    __API__: JSON.stringify('https://slobodasoft.ru/api'),
  },
  server: {
    port: 80,
  },
})
