import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env.TEST)


  return {
    server: { port: 8082 },
    plugins: [vue()],
    base: env.VITE_NODE_ENV === 'production' ? `/${env.VITE_BASE_URL}/` : '/'
  }
})