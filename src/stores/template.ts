import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import defaultCss from '@/themes/default.css?raw'

export const useTemplateStore = defineStore('template', () => {
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
    const htmlContent = `
  <style>
  ${(defaultCss).replaceAll('var(--u-theme)', '#a8b1ff')}
  </style>
  <div class="u-view">
  ${getTemplateHtml()}
  </div>
  `
    return htmlContent
  }

  return { code, getCode, setCode, getTemplateHtml, setTemplateHtml, getExportHtml }
})
