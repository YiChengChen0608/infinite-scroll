<script setup lang="ts">
import { reactive } from 'vue'
import { useListStore } from './store'

const paginate = reactive({
  page: 1,
  per_page: 10
})
const listStore = useListStore()
const test = async () => {
  await listStore.getUserReposList({ userId: 'sxzz', params: paginate })
}
</script>

<template>
  <div class="md:container mx-auto">
    <el-button @click="test">test</el-button>
  </div>
</template>

<style scoped>

</style>
