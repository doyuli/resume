import type { ThemeOptions } from '@/themes'
import { useResumeStore } from '@/stores'
import { defaultTheme, themes } from '@/themes'

const themesMap = new Map<string, ThemeOptions>()

const THEME_STYLE_ID = 'U_THEME_STYLE'
let el: HTMLStyleElement
let initialized = false

export function registerTheme(name: string, opts: ThemeOptions) {
  themesMap.set(name, opts)
}

export function initialThemes() {
  if (!initialized) {
    themes.forEach((opts) => {
      registerTheme(opts.value, opts)
    })
    initialized = true
  }
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
