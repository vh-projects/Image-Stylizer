// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'



// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })





import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // <- important: use relative paths so assets load from index.html

  server: {
    port: 5173,
  }
})
