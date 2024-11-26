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
  },
  server: {
    cors: false,
    // hmr: {
    //   host: '192.168.2.17',
    // },
    proxy: {
      "/api": {
        target: "https://8000-idx-sandikrivec-1731184627727.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev",
        changeOrigin: true,
        secure: false,
        // ws: true,
        // rewrite: (path) => path.replace(/^\//, ""),
        // configure: (proxy, _options) => {
        //   proxy.on('error', (err, _req, _res) => {
        //     console.log('proxy error', err);
        //   });
        //   proxy.on('proxyReq', (proxyReq, req, _res) => {
        //     console.log('Sending Request to the Target:', req.method, req.url);
        //   });
        //   proxy.on('proxyRes', (proxyRes, req, _res) => {
        //     console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
        //   });
        // },
      },
    },
  },
})
