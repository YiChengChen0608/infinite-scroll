<script setup lang="ts">
import { defineAsyncComponent, reactive, ref, watch } from 'vue'
import { useListStore } from './store'
import { ElLoading } from 'element-plus'
import { Paginate } from './utils/type'
import { storeToRefs } from 'pinia'

const CardItem = defineAsyncComponent(() => import('./components/CardItem.vue'))

const container = ref<HTMLElement | null>(null)
const itemRefs = ref<HTMLElement[]>([])
const isGetFirstTimeData = ref<boolean>(false)
const isEnd = ref<boolean>(false)
const paginate: Paginate = reactive({
  page: 1,
  per_page: 15
})

const dynamicRefs = (el: HTMLElement) => {
  const index = itemRefs.value.indexOf(el)
  if (index === -1) itemRefs.value.push(el)
}
const listStore = useListStore()

const callback = async (entries: IntersectionObserverEntry[], observer: IntersectionObserver): Promise<void> => {
  if (isGetFirstTimeData.value && entries[0].isIntersecting && !isEnd.value) {
    paginate.page++
    await getActivityList()
    entries[0].target.scrollIntoView({ block: 'end' })
    observer.unobserve(entries[0].target)
  }
  if (!isGetFirstTimeData.value) isGetFirstTimeData.value = true
}

const observer = new IntersectionObserver(callback)

watch(itemRefs.value, (newRefs) => {
  if (newRefs.length <= 0) return
  const target = newRefs[newRefs.length - 1]
  observer.observe(target)
}, {
  deep: true
})

watch(isEnd, () => {
  observer.disconnect()
})

const getActivityList = async (): Promise<void> => {
  const loading = ElLoading.service()
  const isEnding = await listStore.getActivityList({
    params: {
      pageNo: paginate.page,
      pageSize: paginate.per_page,
      paging: true
    }
  })

  if (isEnding) isEnd.value = isEnding
  loading.close()
}
getActivityList()

const { list } = storeToRefs(listStore)

</script>

<template>
  <div ref="container" class="md:container mx-auto flex flex-col gap-2">
    <div :ref="dynamicRefs" v-for="data in list" :key="data.activityNo">
      <CardItem v-bind="data" />
    </div>
  </div>
</template>
