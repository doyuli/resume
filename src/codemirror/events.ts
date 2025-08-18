import type { EditorState } from '@codemirror/state'
import type { EditorView, ViewUpdate } from '@codemirror/view'

export enum EventKey {
  Change = 'change',
  Update = 'update',
  Focus = 'focus',
  Blur = 'blur',
  Ready = 'ready',
  ModelUpdate = 'update:modelValue',
}

export const editorEvents = {
  // when content(doc) change only
  [EventKey.Change]: (_value: string, _viewUpdate: ViewUpdate) => true,
  // when codemirror state change
  [EventKey.Update]: (_viewUpdate: ViewUpdate) => true,
  [EventKey.Focus]: (_viewUpdate: ViewUpdate) => true,
  [EventKey.Blur]: (_viewUpdate: ViewUpdate) => true,
  // when component mounted
  [EventKey.Ready]: (_payload: { view: EditorView, state: EditorState, container: HTMLDivElement }) => true,
}

export const modelUpdateEvent = {
  [EventKey.ModelUpdate]: editorEvents[EventKey.Change],
}

export const events = {
  ...editorEvents,
  ...modelUpdateEvent,
}

export type EditorEvents = typeof editorEvents
export type Events = typeof events
