import type { Extension } from '@codemirror/state'
import type { ConfigProps, VueCodemirrorProps } from './props'
import { basicSetup } from './basic-setup'

export function getDefaultConfig(props: VueCodemirrorProps): ConfigProps {
  const { basicSetup: defaultBasicSetup = true } = props

  const extensions: Extension[] = []

  if (defaultBasicSetup) {
    if (typeof defaultBasicSetup === 'boolean') {
      extensions.push(basicSetup())
    }
    else {
      extensions.push(basicSetup(defaultBasicSetup))
    }
  }

  return {
    autofocus: false,
    disabled: false,
    indentWithTab: true,
    tabSize: 2,
    placeholder: '',
    autoDestroy: true,
    extensions,
  }
}
