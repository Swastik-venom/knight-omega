import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
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
          'semi-ui': ['@douyinfe/semi-ui', '@douyinfe/semi-icons'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@douyinfe/semi-ui'],
    esbuildOptions: {
      target: 'es2020',
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