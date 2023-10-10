import { createGlobalState } from '@vueuse/core'
import type { Personal } from '@/form/dto/personal'
import { axiosApi } from '@/shared/utils/axios'
import type { Passport } from '@/form/dto/passport'

export const useFormService = createGlobalState(() => ({
  async sendPersonal(form: Personal) {
    return { success: true }

    const { data } = await axiosApi.post<Response>('/form/personal', form)
    return data
  },
  async sendPassport(form: Passport) {
    return { success: true }

    const { data } = await axiosApi.post<Response>('/form/passport', form)
    return data
  },
}))
