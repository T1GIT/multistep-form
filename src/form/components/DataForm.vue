<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { computed, markRaw } from 'vue'
import { useVModel } from '@vueuse/core'
import DataFormFifthStep from '@/form/components/DataFormFifthStep.vue'
import type { Step } from '@/form/types/step'
import DataFormFirstStep from '@/form/components/DataFormFirstStep.vue'
import type { Link } from '@/form/types/link'

const props = defineProps<{
  index: number
}>()

const emits = defineEmits<{
  (e: 'update:index', value: number): void
}>()

const index = useVModel(props, 'index', emits)

const steps: Step[] = [
  { title: 'Личные данные', component: markRaw(DataFormFirstStep) },
  { title: 'Паспорт', component: markRaw(DataFormFirstStep) },
  { title: 'Паспорт', component: markRaw(DataFormFirstStep) },
  { title: 'Паспорт', component: markRaw(DataFormFirstStep) },
  { title: 'Условия', component: markRaw(DataFormFifthStep) },
]

const currentStep = computed(() => steps[index.value])
const nextStep = computed(() => steps[index.value + 1])

const first = computed(() => index.value === 0)
function prev() {
  if (index.value > 0)
    index.value--
}

const final = computed(() => index.value === steps.length - 1)

const agree = ref(false)
const valid = ref(false)
const submit = ref(false)
const submittable = computed(() => final.value || (valid.value && agree.value))
function handleSubmit() {
  if (submittable.value)
    submit.value = true
}
function handleSuccess() {
  index.value++
}

const links: Link[] = [
  { label: 'Проект сертификата дистанционный "Помощник Ц"', url: '' },
  { label: 'Памятка использования "Помощник Ц"', url: '' },
  { label: 'Согласие на подключение рекурентного платежа', url: '' },
]
</script>

<template>
  <div class="flex flex-col overflow-auto">
    <div class="py-5 sm:py-10 flex relative">
      <button v-show="!first" class="absolute left-0" @click="prev">
        <i class="bi bi-chevron-left text-rose-600 text-2xl" />
      </button>
      <span class="m-auto text-xl font-bold text-gray-700">{{ currentStep.title }}</span>
    </div>

    <div class="flex flex-col gap-2 mb-5">
      <div class="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div class="h-full w-full rounded-full bg-emerald-400 transition-all duration-500" :style="{ width: `${(index + 1) / steps.length * 100}%` }" />
      </div>

      <div class="flex items-center">
        <div class="font-bold text-sm text-gray-700">
          Шаг {{ index + 1 }} из 5
        </div>

        <div class="ml-auto text-sm text-gray-400">
          {{ final ? 'Подписание договора' : `Следующий шаг: ${nextStep.title}` }}
        </div>
      </div>
    </div>

    <div class="divider mb-5 sm:mb-10" />

    <Component :is="currentStep.component" :key="index" v-model:valid="valid" v-model:submit="submit" class="mb-7" @success="handleSuccess" />

    <div v-if="final" class="flex flex-col gap-3 mb-3 sm:mb-7">
      <a v-for="link of links" :key="link.label" :href="link.url" class="link text-sm">{{ link.label }}</a>
    </div>

    <template v-else>
      <button class="flex flex-col items-center gap-2 mb-3 sm:mb-7">
        <span class="text-sm text-gray-300">заполнить через</span>
        <img
          class="w-36" src="@/form/assets/gosuslugi.webp?url"
          alt="Госуслуги"
        >
      </button>

      <div class="flex gap-3 mb-3 sm:mb-7">
        <button
          class="w-6 h-6 border rounded-md flex items-center justify-center"
          @click="agree = !agree"
        >
          <i v-show="agree" class="bi bi-check-lg text-xl text-gray-500" />
        </button>

        <div class="pt-1 text-sm max-w-md">
          Даю согласие на <a class="link" href="">обработку личных данных</a> и
          подписание документов в электронном виде
        </div>
      </div>
    </template>

    <div class="divider mb-4 sm:mb-10" />

    <button class="button sm:mx-10 mb-3 sm:mb-10" :class="[(!submittable) && 'bg-gray-600 pointer-events-none']" @click="handleSubmit">
      {{ final ? 'Подписать договор' : 'Продолжить' }}
    </button>
  </div>
</template>
