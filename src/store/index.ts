import { defineStore } from 'pinia'
import { request } from '../utils/api'

const baseURL: string = 'http://localhost:3000/api'

type Params = {
  pageNo: number,
  pageSize: number,
  paging: boolean
}

type Query = {
  params: Params
}

type List = {
  activityNo: string,
  activityName: string,
  activityKind: string,
  activityType: string,
  activityOrganizer: string,
}

export const useListStore = defineStore('list', {
  state: () => ({
    list: [] as List[]
  }),
  actions: {
    async getActivityList ({ params }: Query): Promise<boolean | undefined> {
      try {
        const { data: { data } } = await request({
          url: `${baseURL}/Activity.svc/GetActivityList`,
          params
        })
        const list = data.map(({ activityNo, activityName, activityKind, activityType, activityOrganizer }: List) => {
          return {
            activityNo,
            activityName,
            activityKind,
            activityType,
            activityOrganizer
          }
        })
        this.list = [...this.list, ...list]
        return !data.length
      } catch (error) {
        console.error(error.message || error.response.data.message)
      }
    }
  }
})
