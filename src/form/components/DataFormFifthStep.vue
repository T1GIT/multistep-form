<script setup lang="ts">
import { tryOnMounted, useVModels, whenever } from '@vueuse/core'
import type { Offer } from '@/form/types/offer'

const props = defineProps<{
  valid: boolean
  submit: boolean
}>()

const emits = defineEmits<{
  (e: 'update:valid', value: boolean): void
  (e: 'update:submit', value: boolean): void
  (e: 'success'): void
}>()

const { valid, submit } = useVModels(props, emits)
tryOnMounted(() => {
  valid.value = false
  submit.value = false
})

const offers: Offer[] = [
  { name: 'Сумма займа', value: '23 000 ₽' },
  { name: 'Дата возврата', value: '25 500 ₽' },
  { name: 'Плата за заём', value: '300 ₽' },
  { name: 'Ставка', value: '0,9 %' },
  { name: 'ПСК', value: '30.04.2020' },
]

async function send() {
  emits('success')
}
whenever(submit, send)
</script>

<template>
  <div class="flex flex-col gap-3 sm:gap-5">
    <div v-for="offer of offers" :key="offer.name" class="flex flex-col gap-3 sm:gap-5">
      <div class="flex items-center justify-between">
        <span class="text-gray-400 text-sm">{{ offer.name }}:</span>
        <span class="font-bold">{{ offer.value }}</span>
      </div>

      <div class="divider" />
    </div>
  </div>
</template>
