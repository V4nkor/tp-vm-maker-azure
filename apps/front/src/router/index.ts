import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

export function setupRouter() {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  return router
}