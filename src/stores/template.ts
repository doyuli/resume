import { defineStore, storeToRefs } from 'pinia'
import { shallowRef } from 'vue'
import { getCurrentTheme } from '@/utils/theme'
import { StylePropertyEnum, useResumeStore } from '.'

// TODO：待优化
const fonts = {
  'Noto Sans SC': {
    url: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap',
  },
  'Noto Serif SC': {
    url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700&display=swap',
  },
} as any

export const useTemplateStore = defineStore(
  'template',
  () => {
    const resumeStore = useResumeStore()
    const { color, lineHeight, fontFamily, theme } = storeToRefs(resumeStore)

    const code = shallowRef('')
    const templateHtml = shallowRef('')

    function setCode(v: string) {
      code.value = v
    }

    function getCode() {
      return code.value
    }

    function setTemplateHtml(v: string) {
      templateHtml.value = v
    }

    function getTemplateHtml() {
      return templateHtml.value
    }

    function getExportHtml() {
      const current = getCurrentTheme(theme.value)
      const styleContent = (current.css)
        .replaceAll(`var(${[StylePropertyEnum.THEME_COLOR]})`, color.value)
        .replaceAll(`var(${[StylePropertyEnum.LINE_HEIGHT]})`, lineHeight.value.toString())
        .replaceAll(`var(${[StylePropertyEnum.FONT_FAMILY]})`, fontFamily.value)

      const fontContent = fonts[fontFamily.value] ? `@import url('${fonts[fontFamily.value].url}');` : ''

      const htmlContent = `
        <style>
        ${fontContent}
        ${styleContent}
        </style>
        <div class="u-view">
        ${getTemplateHtml()}
        </div>
        `
      return htmlContent
    }

    return { code, getCode, setCode, getTemplateHtml, setTemplateHtml, getExportHtml }
  },
  {
    persist: ['code'],
  },
)
