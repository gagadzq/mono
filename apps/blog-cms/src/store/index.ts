import { defineStore } from 'pinia'
import { getAccountInfo } from '@/apis/user'

export const useAccountInfo = defineStore('accountInfo', {
  state: () => ({
    info: {
      nickname: '',
    },
  }),
  getters: {
    accountInfo: (state) => {
      return state.info
    },
  },
  actions: {
    async getAccountInfo() {
      const info = await getAccountInfo()
      this.info = info
    },
  },
})
