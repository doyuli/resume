<script setup lang="ts">
import type { EditorView, ViewUpdate } from '@codemirror/view'
import { redo, undo } from '@codemirror/commands'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { computed, reactive, shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { useTemplateStore } from '@/stores/template'
import { useThemeStore } from '@/stores/theme'
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
  height: 'calc(100vh - var(--header-height))',
}

const extensions = computed(() => themeStore.isDark ? [markdown(), oneDark] : [markdown()])

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

function handleReady({ view }: any) {
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
      :style="{
        width: '100%',
        height: options.height,
        backgroundColor: '#fff',
        color: '#333',
      }"
      placeholder="Please enter the code."
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
