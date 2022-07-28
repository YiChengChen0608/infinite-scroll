<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    default: ''
  },
  visibility: {
    type: String,
    default: ''
  },
  is_template: {
    type: Boolean,
    required: true
  },
  html_url: {
    type: String,
    default: ''
  }
})

const getFirstWordUpperCase = (character: string): string => {
  const words = character.split('')
  words[0] = words[0].toUpperCase()
  return words.join('')
}

</script>
<template>
  <el-card>
    <div class="flex items-center gap-2">
      <h4 class="text-xl font-medium text-blue-500 text-ellipsis overflow-hidden whitespace-nowrap">{{ name }}</h4>
      <small class="border rounded-full px-2 text-ellipsis overflow-hidden whitespace-nowrap">{{ getFirstWordUpperCase(visibility) + (is_template ? ' template' : ' ' )}}</small>
    </div>
    <div class="my-2"></div>
    <small class="break-words">{{ html_url }}</small>
  </el-card>
</template>
