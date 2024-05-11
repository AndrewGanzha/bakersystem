// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {

})

export const user = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    setUserFromServer (data) {
      this.user = data;
    }
  }
})
