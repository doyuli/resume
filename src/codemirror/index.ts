export type { BasicSetupOptions, MinimalSetupOptions } from './basic-setup'
export { basicSetup, minimalSetup } from './basic-setup'
export { default as Codemirror } from './component'
export type { VueCodemirrorProps } from './props'

/** dependencies */
export { redo, undo } from '@codemirror/commands'
export { markdown } from '@codemirror/lang-markdown'
export { oneDark } from '@codemirror/theme-one-dark'
export { EditorView } from '@codemirror/view'
export type { ViewUpdate } from '@codemirror/view'
