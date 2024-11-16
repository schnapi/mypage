import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "tailwindcss";

const ASSET_URL = '';
// let base = `${ASSET_URL}/dist/`
let base = `${ASSET_URL}/mypage/dist/`

// https://vite.dev/config/
export default defineConfig({
  base: base,
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    }
  }
})
