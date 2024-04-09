// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { NodeGlobalsPolyfillPlugin as _NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import NodeGlobalsPolyfillPlugin from 'rollup-plugin-polyfill-node';

import inject from '@rollup/plugin-inject';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueJsx(),
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),
    Layouts(),
    AutoImport({
      imports: [
        'vue',
        {
          'vue-router/auto': ['useRoute', 'useRouter'],
        }
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Fonts({
      google: {
        families: [ {
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      path: 'path-browserify',
      stream: 'stream-browserify',
      crypto: 'crypto-browserify',
      assert: 'assert-browserify',
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
    preserveSymlinks: true,
  },
  optimizeDeps: {
    force: true,

    esbuildOptions: {
        target: ['es2020'],
        define: {
            global: 'globalThis',
        },
        plugins: [
            _NodeGlobalsPolyfillPlugin({
                process: true,
                buffer: true,
            }),
        ],
    },
  },
  build: {
    lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/lib/main.ts'),
        name: 'diamondhand-widget',
        // the proper extensions will be added
        fileName: 'diamondhand-widget',
    },
    commonjsOptions: {
        transformMixedEsModules: true,
    },
    rollupOptions: {
        external: ['vue','vuetify'],
        output: {
            manualChunks: undefined,
        },
        plugins: [
            inject({ Buffer: ['buffer', 'Buffer'], Process: ['process', 'Process']}),
            NodeGlobalsPolyfillPlugin()
        ],
    },
  },
  server: {
    port: 3000,
  },
})
