import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "tailwindcss";

const ASSET_URL = '';

// https://vite.dev/config/
export default defineConfig({
  base: `${ASSET_URL}/dist/`,
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    }
  }
})
