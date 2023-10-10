<script setup lang="ts">
import { reactive } from 'vue'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { syncRefs, tryOnMounted, useVModels, whenever } from '@vueuse/core'
import type { Personal } from '@/form/dto/personal'
import type { Input } from '@/form/types/input'
import { useFormService } from '@/form/services/form'

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

const state = reactive<Personal>({
  first_name: '',
  last_name: '',
  middle_name: '',
  birth_date: '',
  birth_country: '',
  email: '',
})

const rules = {
  first_name: { required },
  last_name: { required },
  middle_name: { required },
  birth_date: { required },
  birth_country: { required },
  email: {},
}

const $v = useVuelidate(rules, state)
syncRefs(() => !$v.value.$invalid, valid)

function checkInvalid(key: string) {
  const field = $v.value[key]
  return field.$dirty && field.$invalid
}

const options: Input[] = [
  { label: 'Фамилия*', key: 'last_name' },
  { label: 'Имя*', key: 'first_name' },
  { label: 'Отчество*', key: 'middle_name' },
  { label: 'Дата рождения*', key: 'birth_date' },
  { label: 'Страна места рождения*', key: 'birth_country' },
  { label: 'E-mail', key: 'email' },
]

const formService = useFormService()
async function send() {
  await formService.sendPersonal(state)
  emits('success')
}
whenever(submit, send)
</script>

<template>
  <form class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
    <input
      v-for="option of options"
      :key="option.key"
      v-model="$v[option.key].$model"
      :placeholder="option.label"
      class="input"
      :class="[checkInvalid(option.key) && 'border-red-400']"
    >
  </form>
</template>
