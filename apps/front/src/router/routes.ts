const routes = [
  { path: '/', name: 'Home' , component: () => import('../views/Home.vue') },
  { path: '/login', name: 'Login' , component: () => import('../views/Login.vue') },
  { path: '/logout', name: 'Logout' , component: () => import('../views/Logout.vue') },
  { path: '/vms', name: 'Select VM' , component: () => import('../views/SelectVm.vue') },
  { path: '/vms/create-vm:id', name: 'Create VM' , component: () => import('../views/Create.vue') },
  { path: '/:pathMatch(.*)*', name: 'Not Found',  component: () => import('../views/NotFound.vue') },
]

export default routes
