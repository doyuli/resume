import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const useResumeStore = defineStore('resume', () => {
  const resumeConfig = reactive({
    name: 'resume',
    fontFamily: 'Sans',
    color: '',
    lineHeight: 19,
  })

  return toRefs(resumeConfig)
})
