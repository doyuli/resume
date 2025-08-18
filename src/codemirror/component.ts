import type { EditorState } from '@codemirror/state'
import type { EditorView } from '@codemirror/view'
import type { VueCodemirrorProps } from './props'
import { computed, defineComponent, h, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import { createEditorState, createEditorView, destroyEditorView, getEditorTools } from './codemirror'
import { getDefaultConfig } from './config'
import { EventKey, events } from './events'
import { props } from './props'

export default defineComponent<VueCodemirrorProps>({
  name: 'VueCodemirror',
  emits: { ...events },
  props: props as unknown as any,
  setup(props, { emit }) {
    const container = shallowRef<HTMLDivElement>()
    const state = shallowRef<EditorState>()
    const view = shallowRef<EditorView>()

    const defaultConfig = getDefaultConfig(props)

    const config = computed(() => {
      return {
        ...defaultConfig,
        ...props,
      }
    })

    onMounted(() => {
      state.value = createEditorState({
        doc: props.modelValue,
        selection: config.value.selection,
        // The extensions are split into two parts, global and component prop.
        // Only the global part is initialized here.
        // The prop part is dynamically reconfigured after the component is mounted.
        extensions: defaultConfig.extensions ?? [],
        onFocus: viewUpdate => emit(EventKey.Focus, viewUpdate),
        onBlur: viewUpdate => emit(EventKey.Blur, viewUpdate),
        onUpdate: viewUpdate => emit(EventKey.Update, viewUpdate),
        onChange: (newDoc, viewUpdate) => {
          if (newDoc !== props.modelValue) {
            emit(EventKey.Change, newDoc, viewUpdate)
            emit(EventKey.ModelUpdate, newDoc, viewUpdate)
          }
        },
      })

      view.value = createEditorView({
        state: state.value,
        parent: container.value!,
        root: config.value.root,
      })

      const editorTools = getEditorTools(view.value)

      // watch prop.modelValue
      watch(
        () => props.modelValue,
        (newValue) => {
          if (newValue !== editorTools.getDoc()) {
            editorTools.setDoc(newValue)
          }
        },
      )

      // watch prop.extensions
      watch(
        () => props.extensions,
        extensions => editorTools.reExtensions(extensions || []),
        { immediate: true },
      )

      // watch prop.disabled
      watch(
        () => config.value.disabled,
        disabled => editorTools.toggleDisabled(disabled),
        { immediate: true },
      )

      // watch prop.indentWithTab
      watch(
        () => config.value.indentWithTab,
        iwt => editorTools.toggleIndentWithTab(iwt),
        { immediate: true },
      )

      // watch prop.tabSize
      watch(
        () => config.value.tabSize,
        tabSize => editorTools.setTabSize(tabSize!),
        { immediate: true },
      )

      // watch prop.phrases
      watch(
        () => config.value.phrases,
        phrases => editorTools.setPhrases(phrases || {}),
        { immediate: true },
      )

      // watch prop.placeholder
      watch(
        () => config.value.placeholder,
        placeholder => editorTools.setPlaceholder(placeholder!),
        { immediate: true },
      )

      // watch prop.style
      watch(
        () => config.value.style,
        style => editorTools.setStyle(style),
        { immediate: true },
      )

      // immediate autofocus
      if (config.value.autofocus) {
        editorTools.focus()
      }

      emit(EventKey.Ready, {
        state: state.value!,
        view: view.value!,
        container: container.value!,
      })
    })

    onBeforeUnmount(() => {
      if (config.value.autoDestroy && view.value) {
        destroyEditorView(view.value)
      }
    })

    return () => {
      return h('div', {
        class: 'v-codemirror',
        style: { display: 'contents' },
        ref: container,
      })
    }
  },
})
