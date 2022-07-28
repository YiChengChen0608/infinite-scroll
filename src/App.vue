<script setup lang="ts">
import { defineAsyncComponent, reactive, ref, watchEffect } from 'vue'
import { useListStore } from './store'
import { ElLoading } from 'element-plus'
import { storeToRefs } from 'pinia'
import { Paginate } from './utils/type'

const CardItem = defineAsyncComponent(() => import('./components/CardItem.vue'))

const container = ref<HTMLElement | null>(null)
const itemRefs = ref<HTMLElement[]>([])
const paginate: Paginate = reactive({
  page: 1,
  per_page: 15
})

const dynamicRefs = (el: HTMLElement) => {
  itemRefs.value.push(el)
}

const listStore = useListStore()

watchEffect(() => {
  if (itemRefs.value.length <= 0) return
  const target = itemRefs.value[itemRefs.value.length - 1]
  const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
    if (entries[0].isIntersecting) {
      console.log(1)
    } else {
      observer.unobserve(target)
    }
  }
  const options = {
    root: container.value
  }
  const observer = new IntersectionObserver(callback, options)
  observer.observe(target)
})

const getfirstData = async (): Promise<void> => {
  const loading = ElLoading.service()
  await listStore.getUserReposList({ userId: 'sxzz', params: paginate })
  loading.close()
}

getfirstData()

const { list } = storeToRefs(listStore)
</script>

<template>
  <div ref="container" class="md:container mx-auto py-2 flex flex-col gap-2">
    <div :ref="dynamicRefs" v-for="data in list" :key="data.id">
      <CardItem v-bind="data" />
    </div>
  </div>
</template>
