import { defineStore } from 'pinia'
import { shallowRef } from 'vue'

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

  return { code, getCode, setCode, getTemplateHtml, setTemplateHtml }
})
