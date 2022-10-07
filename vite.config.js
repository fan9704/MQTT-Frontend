import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'
// https://vitejs.dev/config/
const path = require('path')
export default defineConfig({
  build:{
    chunkSizeWarningLimit:1500,
  },
  plugins: [
      vue(),
      vuetify({
        autoImport: true,
      }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue$': 'vue/dist/vue.esm.js',
      'static': path.resolve(__dirname, '../static'),
      '/images':'src/assets/images',
    },
  },
  server: {
    proxy: {
      // 選項寫法
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace('', '')
      },
    }
  },

})
