import type { ResumeStore } from '@/stores'
import { useResumeStore } from '@/stores'
import { defaultTheme } from '@/themes'

export interface ThemeOptions {
  label: string
  value: string
  css: string
  themeColor?: string
  custom?: (context: ResumeStore) => void
}

const themesMap = new Map<string, ThemeOptions>()

const THEME_STYLE_ID = 'U_THEME_STYLE'
let el: HTMLStyleElement

export function registerTheme(opts: ThemeOptions) {
  themesMap.set(opts.value, opts)
}

export function registerThemes(themes: ThemeOptions[]) {
  themes.forEach((opts) => {
    registerTheme(opts)
  })
}

export function getThemeOptions() {
  return Array.from(themesMap.entries()).map(([_, opts]) => ({
    label: opts.label,
    value: opts.value,
  }))
}

export function getCurrentTheme(name: string): ThemeOptions {
  return themesMap.get(name) ?? defaultTheme
}

export function setCurrentTheme(name: string) {
  const resumeStore = useResumeStore()

  const current = getCurrentTheme(name)
  const { themeColor, css, custom } = current

  if (!el) {
    el = (document.getElementById(THEME_STYLE_ID) || document.createElement('style')) as HTMLStyleElement
    el.id = THEME_STYLE_ID
    el.textContent = css
    document.head.appendChild(el)
  }
  else {
    el.textContent = css
  }

  if (themeColor)
    resumeStore.color = themeColor

  if (custom)
    custom(resumeStore)
}
