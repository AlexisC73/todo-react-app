import { defineConfig } from 'vitest/config'
import tsconfigpaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigpaths()],
  test: {
    include: ['src/**/__tests__/**/*.{test,spec}.{ts,tsx}'],
  }
})
