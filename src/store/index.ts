import { defineStore } from 'pinia'
import { request } from '../utils/api'

const baseURL: string = 'http://localhost:3000/github'

type Paginate = {
  page: number,
  per_page: number
}

type Query = {
  userId: string,
  params: Paginate
}

export const useListStore = defineStore('list', {
  state: () => ({
    list: []
  }),
  actions: {
    async getUserReposList ({ userId, params }: Query): Promise<void> {
      try {
        const result = await request({
          url: `${baseURL}/users/${userId}/repos`,
          params
        })
        console.log(result)
      } catch (error) {
        console.error(error.message || error.response.data.message)
      }
    }
  }
})
