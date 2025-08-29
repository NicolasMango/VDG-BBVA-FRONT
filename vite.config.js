import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
        // /api/oferta/...  -->  /accion/...
        // /api/lo-que-sea  -->  /lo-que-sea
        rewrite: (p) =>
          p.replace(/^\/api\/oferta(\/.*)?$/, '/accion$1').replace(/^\/api\//, '/')
      }
    }
  }
})
