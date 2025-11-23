import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (id.includes('react-telegram-login') && id.endsWith('.js')) {
          return transformWithEsbuild(code, id, {
            loader: 'jsx',
            jsx: 'automatic',
          })
        }
        return null
      },
    },
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Fix for React 19 and Semi-UI findDOMNode issue
      'react-dom': 'react-dom',
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'semi-ui': ['@douyinfe/semi-ui-19', '@douyinfe/semi-icons'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@douyinfe/semi-ui-19', 'react-telegram-login'],
    esbuildOptions: {
      target: 'es2020',
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    host: true, // Expose on network
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
})