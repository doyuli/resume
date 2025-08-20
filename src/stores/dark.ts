import { useDark, useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useDarkStore = defineStore('dark', () => {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  return { isDark, toggleDark }
})
