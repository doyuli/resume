<script setup lang="ts">
import type { ViewUpdate } from '@/codemirror'
import { computed, reactive, shallowRef } from 'vue'
import { Codemirror, EditorView, markdown, oneDark, redo, undo } from '@/codemirror'
import { useTemplateStore, useThemeStore } from '@/stores'
import md from '../../templates/default.md?raw'

const themeStore = useThemeStore()

const code = shallowRef(md)
const editorInstance = shallowRef<EditorView>()
const { setCode } = useTemplateStore()
setCode(code.value)

const options = {
  disabled: false,
  indentWithTab: true,
  tabSize: 2,
  autofocus: true,
  style: {
    height: 'calc(100vh - var(--header-height))',
    color: 'var(--u-text-1)',
  },
}

const extensions = computed(() => {
  const _extensions = [
    markdown(),
    EditorView.lineWrapping,
  ]
  if (themeStore.isDark)
    _extensions.push(oneDark)
  return _extensions
})

interface EditorState {
  lines?: number
  cursor?: number
  selected?: number
  length?: number
}
const state = reactive<EditorState>({
  lines: undefined,
  cursor: undefined,
  selected: undefined,
  length: undefined,
})

// https://github.com/codemirror/commands/blob/main/test/test-history.ts
function handleUndo() {
  undo({
    state: editorInstance.value!.state,
    dispatch: editorInstance.value!.dispatch,
  })
}

function handleRedo() {
  redo({
    state: editorInstance.value!.state,
    dispatch: editorInstance.value!.dispatch,
  })
}

function handleReady({ view }: { view: EditorView }) {
  editorInstance.value = view
}

function handleStateUpdate(viewUpdate: ViewUpdate) {
  // selected
  const ranges = viewUpdate.state.selection.ranges
  state.selected = ranges.reduce((plus, range) => plus + range.to - range.from, 0)
  state.cursor = ranges[0].anchor
  // length
  state.length = viewUpdate.state.doc.length
  state.lines = viewUpdate.state.doc.lines
}

defineExpose({
  state,
  handleUndo,
  handleRedo,
  code,
})
</script>

<template>
  <div class="u-editor">
    <Codemirror
      v-model="code"
      :style="options.style"
      placeholder="请输入..."
      :basic-setup="{ lineNumbers: false, foldGutter: false }"
      :extensions="extensions"
      :autofocus="options.autofocus"
      :disabled="options.disabled"
      :indent-with-tab="options.indentWithTab"
      :tab-size="options.tabSize"
      @update="handleStateUpdate"
      @ready="handleReady"
      @change="setCode"
    />
  </div>
</template>

<style lang="scss" scoped></style>
