<script setup lang="ts">
import { ref } from '@vue/reactivity'
import IdentificationForm from '@/form/components/IdentificationForm.vue'
import ResultForm from '@/form/components/ResultForm.vue'
import DataForm from '@/form/components/DataForm.vue'

const index = ref(0)
const identified = ref(false)
</script>

<template>
  <div class="h-full sm:h-auto w-full sm:w-[36rem] px-4 sm:px-8 sm:rounded-md sm:border sm:border-gray-200 sm:shadow-xl flex bg-white overflow-auto">
    <DataForm v-if="index < 5" v-model:index="index" class="flex-1" />
    <IdentificationForm v-else-if="!identified" v-model:identified="identified" class="flex-1" />
    <ResultForm v-else class="flex-1" />
  </div>
</template>
