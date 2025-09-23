import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from 'vite-plugin-babel'
import tsconfigPaths from 'vite-tsconfig-paths'
import { addRenderIds } from './plugins/addRenderIds'
import { aliases } from './plugins/aliases'
import consoleToParent from './plugins/console-to-parent'
import { layoutWrapperPlugin } from './plugins/layouts'
import { loadFontsFromTailwindSource } from './plugins/loadFontsFromTailwindSource'
import { nextPublicProcessEnv } from './plugins/nextPublicProcessEnv'
import { restart } from './plugins/restart'
import { restartEnvFileChange } from './plugins/restartEnvFileChange'

export default defineConfig({
  // Available via import.meta.env.NEXT_PUBLIC_*
  envPrefix: 'NEXT_PUBLIC_',

  optimizeDeps: {
    include: ['fast-glob', 'lucide-react'],
    exclude: [
      '@hono/auth-js/react',
      '@hono/auth-js',
      '@auth/core',
      'hono/context-storage',
      '@auth/core/errors',
      'fsevents',
      'lightningcss',
    ],
  },

  logLevel: 'info',

  plugins: [
    nextPublicProcessEnv(),
    restartEnvFileChange(),
    babel({
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: /node_modules/,
      babelConfig: {
        babelrc: false,
        configFile: false,
        plugins: ['styled-jsx/babel'],
      },
    }),
    restart({
      restart: [
        'src/**/page.jsx',
        'src/**/page.tsx',
        'src/**/layout.jsx',
        'src/**/layout.tsx',
        'src/**/route.js',
        'src/**/route.ts',
      ],
    }),
    consoleToParent(),
    loadFontsFromTailwindSource(),
    addRenderIds(),
    react(),            // ✅ switched from reactRouter/serve to standard Vite React plugin
    tsconfigPaths(),
    aliases(),
    layoutWrapperPlugin(),
  ],

  resolve: {
    alias: {
      lodash: 'lodash-es',
      'npm:stripe': 'stripe',
      stripe: path.resolve(__dirname, './src/__create/stripe'),
      '@auth/create/react': '@hono/auth-js/react',
      '@auth/create': path.resolve(__dirname, './src/__create/@auth/create'),
      '@': path.resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },

  clearScreen: false,

  server: {
    allowedHosts: true,
    host: '0.0.0.0',
    port: 4000,
    hmr: { overlay: false },
    warmup: {
      clientFiles: ['./src/app/**/*', './src/app/root.tsx', './src/app/routes.ts'],
    },
  },

  build: {
    outDir: 'dist',       // ✅ Vercel expects this
    emptyOutDir: true,    // clean build before output
  },
})
