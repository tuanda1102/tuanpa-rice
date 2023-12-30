/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vite/client" />

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  envPrefix: 'VERCEL',
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
    },
  },
});
