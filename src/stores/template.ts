import { defineStore, storeToRefs } from 'pinia'
import { shallowRef } from 'vue'
import defaultCss from '@/themes/default.css?raw'
import { StylePropertyEnum, useResumeStore } from '.'

export const useTemplateStore = defineStore(
  'template',
  () => {
    const resumeStore = useResumeStore()
    const { color, lineHeight, fontFamily } = storeToRefs(resumeStore)

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
      const styleContent = (defaultCss)
        .replaceAll(`var(${[StylePropertyEnum.THEME_COLOR]})`, color.value)
        .replaceAll(`var(${[StylePropertyEnum.LINE_HEIGHT]})`, lineHeight.value.toString())
        .replaceAll(`var(${[StylePropertyEnum.FONT_FAMILY]})`, fontFamily.value)

      const htmlContent = `
        <style>
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
