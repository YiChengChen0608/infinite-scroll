<script lang="ts" setup>
defineProps({
  activityNo: {
    type: String,
    default: ''
  },
  activityName: {
    type: String,
    default: ''
  },
  activityKind: {
    type: String,
    default: ''
  },
  activityType: {
    type: String,
    default: ''
  },
  activityOrganizer: {
    type: String,
    default: ''
  }
})

</script>
<template>
  <el-card>
    <div class="flex items-center gap-2">
      <h4 class="text-xl font-medium text-blue-500 text-ellipsis overflow-hidden whitespace-nowrap">{{ activityName }}</h4>
      <small class="border rounded-full px-2 text-ellipsis overflow-hidden whitespace-nowrap">{{ activityNo }}</small>
    </div>
    <div class="my-2"></div>
    <small class="break-words">{{ activityOrganizer }}</small>
    <div class="my-2"></div>
    <small class="flex gap-2">
      <el-tag v-if="activityType">{{ activityType }}</el-tag>
      <el-tag v-if="activityKind">{{ activityKind }}</el-tag>
    </small>
  </el-card>
</template>
