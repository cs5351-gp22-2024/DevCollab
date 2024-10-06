import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import sass from 'sass'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/_variables.scss";
          @import "@/assets/_mixins.scss";
          @import "@/assets/_responsive.scss";
        `,
        implementation: sass,
        sassOptions: {
          quietDeps: true
        },
        silenceDeprecations: ['legacy-js-api']
      }
    },
    postcss: {
      plugins: [tailwindcss('./tailwind.config.ts'), autoprefixer]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: ['lodash', 'bootstrap']
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
