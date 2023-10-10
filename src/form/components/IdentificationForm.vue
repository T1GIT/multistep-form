<script setup lang="ts">
import { useIntervalFn, useVModel } from '@vueuse/core'
import { ref } from '@vue/reactivity'

const props = defineProps<{
  identified: boolean
}>()

const emits = defineEmits<{
  (e: 'updated:identified', value: boolean): void
}>()

const identified = useVModel(props, 'identified', emits)

const code = ref('')

const seconds = ref(80)
useIntervalFn(() => seconds.value = Math.max(0, seconds.value - 1), 1000)
</script>

<template>
  <div class="flex flex-col">
    <div class="max-w-sm mx-auto py-10 text-center text-xl font-bold text-gray-700">
      Подтверждение удаленной идентификации
    </div>

    <div class="text-gray-500 text-center text-sm">
      Мы отправили SMS с кодом на ваш номер телефона
    </div>

    <div class="mt-16 mb-24 flex flex-col gap-2 text-gray-700">
      <span class="font-bold">Код</span>
      <input v-model="code" class="input" placeholder="Введите код из смс">
    </div>

    <button class="button my-7" :class="[!(code.length > 0) && 'bg-gray-600 pointer-events-none']" @click="identified = true">
      Проверить код
    </button>

    <div class="flex flex-col items-center mb-6">
      <span class="text-gray-400 text-sm">Отправить код повторно через</span>
      <button class="text-blue-400 text-sm">
        {{ seconds }} секунд
      </button>
    </div>
  </div>
</template>
