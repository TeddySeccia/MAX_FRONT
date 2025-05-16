import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@img': path.resolve(__dirname, 'src/asset/img')
      //C'est pas grave si dirname est en rouge. Erreur eslint
    }
  }
})
