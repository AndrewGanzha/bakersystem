// Utilities
import { defineStore } from 'pinia'
import {supabase} from "../service/dataBaseConnetct";

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

export const orders = defineStore('orders', {
  state: () => ({
      ordersInWork: [],
      ordersInQueue: []
  }),
  actions: {
    setOrdersInWork (data) {
      this.ordersInWork = data;
    },
    setOrdersInQueue (data) {
      this.ordersInQueue = data;
    }
  },
})
