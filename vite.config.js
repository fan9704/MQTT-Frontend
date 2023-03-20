import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
const path = require('path')
export default defineConfig({
  base: process.env.NODE_ENV === 'production'
      ? '/PetMonitoringSystem-Frontend/'
      : '/',
  build:{
    chunkSizeWarningLimit:1500,
  },
  plugins: [
      vue(),
      vuetify({
        autoImport: true,
      }),
      VitePWA({
        mode: "development",
        base: "/",
        // srcDir: "src",
        // filename: "sw.js",
        includeAssets: ["/favicon.png"],
        // strategies: "injectManifest",
        manifest: {
          name: "Pet Monitoring",
          short_name: "PMS",
          theme_color: "#ffffff",
          start_url: "/",
          display: "standalone",
          background_color: "#ffffff",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "logo512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
          sourcemap: true
        }
      }),
  ],
  define: { 'process.env': {} },
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
