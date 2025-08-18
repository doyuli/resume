import type { EditorStateConfig } from '@codemirror/state'
import type { CSSProperties } from 'vue'
import type { BasicSetupOptions } from './basic-setup'

export interface ConfigProps {
  autofocus?: boolean
  disabled?: boolean
  indentWithTab?: boolean
  tabSize?: number
  placeholder?: string
  style?: CSSProperties
  autoDestroy?: boolean
  phrases?: Record<string, string>
  root?: ShadowRoot | Document
  extensions?: EditorStateConfig['extensions']
  selection?: EditorStateConfig['selection']
  basicSetup?: boolean | BasicSetupOptions
}

export interface Props extends ConfigProps {
  modelValue: string
}

export const props = [
  'autofocus',
  'disabled',
  'indentWithTab',
  'tabSize',
  'placeholder',
  'style',
  'autoDestroy',
  'phrases',
  'root',
  'extensions',
  'selection',
  'basicSetup',
  'modelValue',
] as const
