/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import react from '@vitejs/plugin-react';
import { defineConfig, transformWithEsbuild } from 'vite';
import pkg from '@douyinfe/vite-plugin-semi';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
const { vitePluginSemi } = pkg;

// API URL configuration
const API_BASE_URL = 'http://localhost:3000';
const WS_BASE_URL = 'ws://localhost:5173';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: /^date-fns\//, replacement: 'date-fns-v2/' },
      { find: /^util$/, replacement: path.resolve(__dirname, './src/polyfills/util-browser.js') },
      { find: 'stream', replacement: 'stream-browserify' },
      { find: 'events', replacement: 'events/' },
    ],
    // Force Vite to use the main entry points for problematic packages
    mainFields: ['module', 'jsnext:main', 'jsnext'],
    // Add specific resolutions for problematic packages
    dedupe: ['react', 'react-dom'],
  },
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!/src\/.*\.js$/.test(id)) {
          return null;
        }

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      },
    },
    react(),
    vitePluginSemi({
      cssLayer: true,
    }),
  ],

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'antd',
      '@douyinfe/semi-ui',
      '@douyinfe/semi-icons',
      'axios',
      'dayjs',
      'clsx',
      'react-hook-form',
      'i18next',
      'react-i18next',
      'hast-util-is-element',
      'd3-color',
      'd3-quadtree',
      'd3-ease',
      'util',
      'inherits',
      'stream-browserify',
      'events'
    ],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
        '.json': 'json',
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom', 'react-router-dom'],
          'semi-ui': ['@douyinfe/semi-icons', '@douyinfe/semi-ui'],
          'ui-libs': [
            'antd',
            '@ant-design/icons',
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast'
          ],
          tools: ['axios', 'history', 'marked', 'dayjs', 'date-fns'],
          'react-components': [
            'react-dropzone',
            'react-fireworks',
            'react-telegram-login',
            'react-toastify',
            'react-turnstile',
            'react-hook-form',
            'react-resizable-panels',
            'react-day-picker',
            'react-markdown',
            'sonner'
          ],
          i18n: [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
          ],
          charts: [
            'recharts',
            '@visactor/react-vchart',
            '@visactor/vchart',
            '@visactor/vchart-semi-theme'
          ],
          utils: [
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
            'zod',
            'katex',
            'mermaid'
          ],
          animation: [
            'framer-motion',
            'motion',
            'tailwindcss-animate',
            'tw-animate-css'
          ]
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/mj': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/pg': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 4173,
    host: '0.0.0.0',
  },
});