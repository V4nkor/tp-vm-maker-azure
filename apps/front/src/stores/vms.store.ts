import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useVmsStore = defineStore('vms', {
  state: () => ({
    vms: [
      { id: 1, name: 'VM1', user: 'user1', vmType: 'Debian'},
      { id: 2, name: 'VM2', user: 'user', vmType: 'Ubuntu'},
      { id: 3, name: 'VM3', user: 'user3', vmType: 'Windows'},
    ],
  }),
})