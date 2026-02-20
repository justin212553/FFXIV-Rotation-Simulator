// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/FFXIV-Rotation-Simulator/', // 예: '/my-awesome-project/'
})