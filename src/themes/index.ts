import type { ThemeOptions } from '@/utils/theme'
import { getThemeOptions, registerTheme } from '@/utils/theme'
import blueThemeCss from './styles/blue.css?raw'
import defaultThemeCss from './styles/default.css?raw'

export const defaultTheme: ThemeOptions = {
  label: '极简主义',
  value: 'default',
  css: defaultThemeCss,
}

registerTheme(defaultTheme)
registerTheme({
  label: '深蓝星空',
  value: 'blue',
  css: blueThemeCss,
  themeColor: '#231f61',
})

// ⚠️ Must be at the end
export const themes = getThemeOptions()
