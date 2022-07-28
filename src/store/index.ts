import { defineStore } from 'pinia'
import { request } from '../utils/api'
import { Paginate } from '../utils/type'

const baseURL: string = 'http://localhost:3000/github'

type Query = {
  userId: string,
  params: Paginate
}

type List = {
  id: number,
  name: string,
  visibility: string,
  html_url: string,
  is_template: boolean
}

export const useListStore = defineStore('list', {
  state: () => ({
    list: [] as List[]
  }),
  actions: {
    async getUserReposList ({ userId, params }: Query): Promise<void> {
      try {
        const { data } = await request({
          url: `${baseURL}/users/${userId}/repos`,
          params
        })
        this.list = data.map(({ id, name, visibility, html_url, is_template }: List) => {
          return {
            id,
            name,
            visibility,
            html_url,
            is_template
          }
        })
      } catch (error) {
        console.error(error.message || error.response.data.message)
      }
    }
  }
})
