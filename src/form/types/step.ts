import type { DefineComponent } from 'vue'

export interface Step {
  title: string
  component: DefineComponent<{}, {}, any>
}
