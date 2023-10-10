<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useTimeoutFn } from '@vueuse/core'
import Loader from '@/form/components/Loader.vue'

const loading = ref(true)

useTimeoutFn(() => loading.value = false, 3000)
</script>

<template>
  <div class="h-[36rem] flex flex-col justify-center items-center">
    <template v-if="loading">
      <Loader class="w-32 h-32 mb-20" />

      <span class="text-gray-600">Проверка ваших данных!</span>
      <span class="text-gray-600">Это займет до 30 минут!</span>
    </template>

    <template v-else>
      <img class="w-32 mb-10" src="@/form/assets/check.png?url" alt="check">

      <span class="text-gray-600">Договор подписан.</span>
      <span class="text-gray-600">Ожидайте поступления денежных средств</span>
    </template>
  </div>
</template>
