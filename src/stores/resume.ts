import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export enum StylePropertyEnum {
  THEME_COLOR = '--u-theme',
  LINE_HEIGHT = '--u-line-height',
  FONT_FAMILY = '--u-font-family',
}

export const useResumeStore = defineStore(
  'resume',
  () => {
    const resumeConfig = reactive({
      name: 'resume',
      fontFamily: 'Noto Sans SC',
      color: '#a8b1ff',
      lineHeight: 1.9,
      theme: 'default',
    })

    return toRefs(resumeConfig)
  },
  {
    persist: true,
  },
)

export type ResumeStore = ReturnType<typeof useResumeStore>
