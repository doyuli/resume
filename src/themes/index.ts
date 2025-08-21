import type { ResumeStore } from '@/stores'
import blueThemeCss from './blue.css?raw'
import defaultThemeCss from './default.css?raw'

export interface ThemeOptions {
  label: string
  value: string
  css: string
  themeColor?: string
  custom?: (context: ResumeStore) => void
}

export const defaultTheme = {
  label: '极简主义',
  value: 'default',
  css: defaultThemeCss,
}

export const themes: ThemeOptions[] = [
  defaultTheme,
  {
    label: '深蓝星空',
    value: 'blue',
    css: blueThemeCss,
    themeColor: '#231f61',
  },
]
